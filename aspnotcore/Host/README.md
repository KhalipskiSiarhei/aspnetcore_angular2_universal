# ASP.NET Core & Angular 4 (+) advanced starter - with Server-side prerendering (for Angular SEO)!

# Getting Started?

**Make sure you have at least Node 6.x or higher (w/ npm 3+) installed!**

### Visual Studio 2017

Make sure you have .NET Core 1.0+ installed and/or VS2017.
VS2017 will automatically install all the neccessary npm & .NET dependencies when you open the project.

Simply push F5 to start debugging !

**Note**: If you get any errors after this such as `module not found: main.server` (or similar), open up command line and run `npm run build:dev` to make sure all the assets have been properly built by Webpack.

### Visual Studio Code

> Note: Make sure you have the C# extension & .NET Core Debugger installed.

The project comes with the configured Launch.json files to let you just push F5 to start the project.

```bash
# cd into the directory you cloned the project into
npm install && npm run build:dev && dotnet restore
# or yarn install
```

If you're running the project from command line with `dotnet run` make sure you set your environment variables to Development (otherwise things like HMR won't work).

```bash
# on Windows:
set ASPNETCORE_ENVIRONMENT=Development
# on Mac/Linux
export ASPNETCORE_ENVIRONMENT=Development 
```
----

----