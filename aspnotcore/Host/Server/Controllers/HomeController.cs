using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System;
using Newtonsoft.Json.Linq;
using Asp2017.Server.Models;
using System.Collections.Generic;

namespace AspCoreServer.Controllers
{
  public class HomeController : Controller
  {
    private static Dictionary<string, SpaItem> Cache = new Dictionary<string, SpaItem>();

    [HttpGet]
    public async Task<IActionResult> Index()
    {
      var requestFeature = Request.HttpContext.Features.Get<IHttpRequestFeature>();
      var unencodedPathAndQuery = requestFeature.RawTarget;
      var unencodedAbsoluteUrl = $"{Request.Scheme}://{Request.Host}{unencodedPathAndQuery}";
      SpaItem spaItemToUse = null;

      // CSR
      if (IsCSR(unencodedAbsoluteUrl))
      {
        spaItemToUse = new SpaItem();
        spaItemToUse.SpaHtml = "<app></app>";
      }
      // Re-render
      else if (IsReRenderedSSR(unencodedAbsoluteUrl))
      {
        spaItemToUse = await DoRender(requestFeature, unencodedPathAndQuery, unencodedAbsoluteUrl);
      }
      // Pre-render
      else
      {
        if (!Cache.ContainsKey(unencodedAbsoluteUrl))
        {
          var renderedSpaItem = await DoRender(requestFeature, unencodedPathAndQuery, unencodedAbsoluteUrl);
          Cache.Add(unencodedAbsoluteUrl, renderedSpaItem);
        }
        spaItemToUse = Cache[unencodedAbsoluteUrl];
      }

      ViewData["SpaHtml"] = spaItemToUse.SpaHtml; // our <app> from Angular
      ViewData["Title"] = spaItemToUse.Title; // set our <title> from Angular
      ViewData["Styles"] = spaItemToUse.Styles; // put styles in the correct place
      ViewData["Meta"] = spaItemToUse.Meta; // set our <meta> SEO tags
      ViewData["Links"] = spaItemToUse.Links; // set our <link rel="canonical"> etc SEO tags
      ViewData["TransferData"] = spaItemToUse.TransferData; // our transfer data set to window.TRANSFER_CACHE = {};

      return View();
    }

    [HttpGet]
    [Route("sitemap.xml")]
    public async Task<IActionResult> SitemapXml()
    {
      String xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";

      xml += "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";
      xml += "<sitemap>";
      xml += "<loc>http://localhost:4251/home</loc>";
      xml += "<lastmod>" + DateTime.Now.ToString("yyyy-MM-dd") + "</lastmod>";
      xml += "</sitemap>";
      xml += "<sitemap>";
      xml += "<loc>http://localhost:4251/counter</loc>";
      xml += "<lastmod>" + DateTime.Now.ToString("yyyy-MM-dd") + "</lastmod>";
      xml += "</sitemap>";
      xml += "</sitemapindex>";

      return Content(xml, "text/xml");
    }

    public IActionResult Error()
    {
      return View();
    }

    private IRequest AbstractHttpContextRequestInfo(HttpRequest request)
    {

      IRequest requestSimplified = new IRequest();
      requestSimplified.cookies = request.Cookies;
      requestSimplified.headers = request.Headers;
      requestSimplified.host = request.Host;

      return requestSimplified;
    }

    private bool IsReRenderedSSR(string path)
    {
      return path.Contains("calendar");
    }

    private bool IsCSR(string path)
    {
      return path.Contains("cashout");
    }

    private async Task<SpaItem> DoRender(IHttpRequestFeature requestFeature, string unencodedPathAndQuery, string unencodedAbsoluteUrl)
    {
      var nodeServices = Request.HttpContext.RequestServices.GetRequiredService<INodeServices>();
      var hostEnv = Request.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();
      var applicationBasePath = hostEnv.ContentRootPath;

      // ** TransferData concept **
      // Here we can pass any Custom Data we want !

      // By default we're passing down Cookies, Headers, Host from the Request object here
      TransferData transferData = new TransferData();
      var request = AbstractHttpContextRequestInfo(Request);
      transferData.request = request;
      transferData.thisCameFromDotNET = "Hi Angular it's asp.net :)";

      // Prerender / Serialize application (with Universal)
      var prerenderResult = await Prerenderer.RenderToString(
      "/",
      nodeServices,
      new JavaScriptModuleExport(applicationBasePath + "/wwwroot/dist/server/main-server"),
      unencodedAbsoluteUrl,
      unencodedPathAndQuery,
      transferData, // Our simplified Request object & any other CustommData you want to send!
      30000,
      Request.PathBase.ToString());

      var renderedSpaItem = new SpaItem();
      renderedSpaItem.SpaHtml = prerenderResult.Html; // our <app> from Angular
      renderedSpaItem.Title = prerenderResult.Globals["title"]; // set our <title> from Angular
      renderedSpaItem.Styles = prerenderResult.Globals["styles"]; // put styles in the correct place
      renderedSpaItem.Meta = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
      renderedSpaItem.Links = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
      renderedSpaItem.TransferData = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};
      return renderedSpaItem;
    }
  }

  public class IRequest
  {
    public object cookies { get; set; }
    public object headers { get; set; }
    public object host { get; set; }
  }

  public class TransferData
  {
    public dynamic request { get; set; }

    // Your data here ?
    public object thisCameFromDotNET { get; set; }
  }
}
