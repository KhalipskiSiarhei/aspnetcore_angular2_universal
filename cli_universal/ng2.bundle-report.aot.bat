call mode con lines=32766
call npm install -g webpack-bundle-analyzer
call del dist\*.* /s /q
call ng build --target=production --stats-json=true --aot=true
call webpack-bundle-analyzer dist\stats.json --mode=static --report=report.aot.html
pause