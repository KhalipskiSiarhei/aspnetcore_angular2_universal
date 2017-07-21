call ng build --aot --prod --deployUrl=/dist/client/  --output-hashing=none
call xcopy dist\*.js ..\Host\wwwroot\dist\client\ /h/i/c/k/e/r/y
pause