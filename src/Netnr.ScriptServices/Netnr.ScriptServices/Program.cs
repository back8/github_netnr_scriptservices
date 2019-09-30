using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Netnr.ScriptServices
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseWebRoot(Directory.GetCurrentDirectory().Replace("\\", "/").Split("/src/")[0])
            .UseUrls(args)
            .UseStartup<Startup>();
    }
}
