@echo off
REM Build script for Base64Decode Chrome Extension (Windows)
REM Creates a distributable zip file for Chrome Web Store

setlocal enabledelayedexpansion

for /f "tokens=*" %%i in ('node -p "require('./package.json').version"') do set VERSION=%%i

set BUILD_DIR=build
set DIST_DIR=dist
set ZIP_NAME=base64decode-v%VERSION%.zip

echo Building Base64Decode v%VERSION%...

REM Clean previous builds
if exist "%BUILD_DIR%" rmdir /s /q "%BUILD_DIR%"
if exist "%DIST_DIR%" rmdir /s /q "%DIST_DIR%"
mkdir "%BUILD_DIR%"
mkdir "%DIST_DIR%"

REM Copy extension files
echo Copying extension files...
copy manifest.json "%BUILD_DIR%\" >nul
copy background.js "%BUILD_DIR%\" >nul
copy base64.js "%BUILD_DIR%\" >nul
xcopy /E /I /Q _locales "%BUILD_DIR%\_locales" >nul

REM Copy documentation
echo Copying documentation...
copy LICENSE "%BUILD_DIR%\" >nul
copy README.md "%BUILD_DIR%\" >nul

REM Create zip file (requires PowerShell)
echo Creating zip archive...
powershell -command "Compress-Archive -Path '%BUILD_DIR%\*' -DestinationPath '%DIST_DIR%\%ZIP_NAME%' -Force"

echo.
echo Build complete: %DIST_DIR%\%ZIP_NAME%
echo Ready for Chrome Web Store upload

endlocal
