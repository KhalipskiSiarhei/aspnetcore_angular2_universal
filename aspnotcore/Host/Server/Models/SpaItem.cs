using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Asp2017.Server.Models
{
    public class SpaItem
    {
      public string SpaHtml = string.Empty;
      public JToken Title;
      public JToken Styles;
      public JToken Meta;
      public JToken Links;
      public JToken TransferData;
      public JToken Scripts;
  }
}
