using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Netnr.ScriptServices.Controllers
{
    public class BuildController : Controller
    {
        /// <summary>
        /// 生成静态文件
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            var listOut = new List<string>();
            var startNow = DateTime.Now;
            listOut.Add("Starting time：" + startNow.ToString("yyyy-MM-dd HH:mm:ss"));

            var cacheKey = "GlobalKey-HtmlPath";
            Core.CacheTo.Set(cacheKey, "yes");

            string url = Request.Scheme + "://" + Request.Host.ToString() + "/home/";
            string path = Startup.HostingEnvironment.WebRootPath + "/";

            int pageCount = 0;
            //反射action
            var type = typeof(HomeController);
            var methods = type.GetMethods();
            foreach (var item in methods)
            {
                if (item.DeclaringType == type)
                {
                    string html = Core.HttpTo.Get(url + item.Name);
                    Core.FileTo.WriteText(html, path, item.Name.ToLower() + ".html", false);
                    pageCount++;
                }
            }

            Core.CacheTo.Remove(cacheKey);

            listOut.Add("Time：" + (DateTime.Now - startNow).TotalMilliseconds + " MS");
            listOut.Add("Count：" + pageCount);
            listOut.Add("Successful");

            return Content(string.Join(Environment.NewLine, listOut));
        }
    }
}
