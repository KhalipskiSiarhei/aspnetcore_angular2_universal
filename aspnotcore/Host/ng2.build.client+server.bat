cd ../Components/
call ng2.build.aot+copy.bat
cd ../Host

cd ../Components.Server/
call webpack.build+copy.bat
cd ../Host