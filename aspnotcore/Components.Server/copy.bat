call xcopy ..\Components\src\main.browser.ts Client\main.browser.ts /h/i/c/k/e/r/y
call xcopy ..\Components\src\main.server.aot.ts Client\main.server.aot.ts /h/i/c/k/e/r/y
call xcopy ..\Components\src\main.server.ts Client\main.server.ts /h/i/c/k/e/r/y
call xcopy ..\Components\src\tsconfig.browser.json Client\tsconfig.browser.json /h/i/c/k/e/r/y
call xcopy ..\Components\src\tsconfig.server.aot.json Client\tsconfig.server.aot.json /h/i/c/k/e/r/y
call xcopy ..\Components\src\tsconfig.server.json Client\tsconfig.server.json /h/i/c/k/e/r/y

call del /q Client\polyfills\*
call xcopy ..\Components\src\polyfills\*.* Client\polyfills\*.* /h/i/c/k/e/r/y

call del /q Client\app\*
call xcopy ..\Components\src\app\*.* Client\app\*.* /h/i/c/k/e/r/y
pause