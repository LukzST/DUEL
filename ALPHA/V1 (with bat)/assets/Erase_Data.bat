@echo off
color 06
cd..
cd Achievements

cls

REM Animation loop for "Deleting your progress"

for %%A in ("Deleting your progress" "Deleting your progress." "Deleting your progress.." "Deleting your progress..." "Deleting your progress" "Deleting your progress." "Deleting your progress.." "Deleting your progress...") do (
    echo %%A
    timeout /t 1 >nul
    cls
)

del /Q *
cd..
echo Files deleted successfully!
pause

REM Confirmation menu
cls
echo ==========================================
echo Do you want to see the developer's website?
echo ==========================================
echo (1) Yes
echo (2) No
echo ==========================================
set /p choice="> "

if "%choice%"=="1" (
    cls
    REM Animation loop for "Opening"
    for %%A in ("Opening" "Opening." "Opening.." "Opening..." "Opening" "Opening.") do (
        echo %%A
        timeout /t 1 >nul
        cls
    )

    start "" "https://sadberryst.wixsite.com/sadberry"
) else (
cls
    exit
)