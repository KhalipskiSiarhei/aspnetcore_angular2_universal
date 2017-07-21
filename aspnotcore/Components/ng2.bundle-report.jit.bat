call mode con lines=32766
call npm install -g webpack-bundle-analyzer
call del dist\*.* /s /q
call ng build --stats-json=true
call webpack-bundle-analyzer dist\stats.json --mode=static --report=report.jit.html
pause