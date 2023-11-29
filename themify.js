// ==UserScript==
// @name         themify
// @author       monkxy
// @version      1.0.0
// @description  blacket script with built in themes
// @match        https://blacket.org/*
// @icon         https://blacket.org/content/logo.png
// @grant        none
// ==/UserScript==

(async () => {
    const css = `
        .themify__popupOverlay {
            position: absolute;
            width: calc(100% - 11.51vw);
            transform: translateX(11.51vw);
            display: block;
            z-index: 13;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.6);
            height: 100%;
            left: 0;
            top: 0;
        }

        .themify__switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
        }
        
        .themify__switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .themify__slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 20px;
        }
        
        .themify__slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .themify__slider {
            background-color: #2196F3;
        }
        
        input:focus + .themify__slider {
            box-shadow: 0 0 1px #2196F3;
        }
        
        input:checked + .themify__slider:before {
            -webkit-transform: translateX(20px);
            -ms-transform: translateX(20px);
            transform: translateX(20px);
        }
        
        .themify__slider.themify__round {
            border-radius: 20px;
        }
    `;
    const page = window.location.pathname.split("/")[1];
    const head = document.head || document.getElementsByTagName("head")[0]; ''
    const sidebarButtons = document.querySelectorAll(".styles__leftRow___4jCaB-camelCase");
    sidebarButtons[sidebarButtons.length - 1].insertAdjacentHTML("afterend", `<div class="styles__pageButton___1wFuu-camelCase" id="themifyButton"><i class="styles__pageIcon___3OSy9-camelCase fas fa-palette" aria-hidden="true"></i><div class="styles__pageText___1eo7q-camelCase">Themify</div></div>`);
    head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

    if (!localStorage.getItem("themify_themes")) localStorage.setItem("themify_themes", JSON.stringify([]));
    if (!localStorage.getItem("themify_theme")) localStorage.setItem("themify_theme", "");
    if (localStorage.getItem("themify_theme")) {
        const theme = localStorage.getItem("themify_theme");
        const response = await fetch(theme);
        head.insertAdjacentHTML("beforeend", `<style>${await response.text()}</style>`);
    };
    document.getElementById("themifyButton").addEventListener("click", async () => {
        if (document.getElementById("themify__overlay")) {
            document.getElementById("themify__overlay").remove();
            window.history.pushState({}, "", `/${page}`);
        } else {
            window.history.pushState({}, "", "/themify");
            document.body.insertAdjacentHTML("beforeend", `<div class="themify__popupOverlay" id="themify__overlay"></div>`);
            document.getElementById("themify__overlay").insertAdjacentHTML("beforeend", `<div class="styles__background___2J-JA-camelCase" style="z-index: -2;"><div class="styles__blooksBackground___3oQ7Y-camelCase" style="background-image: url('/content/background.png');"></div></div>`);
            document.getElementById("themify__overlay").insertAdjacentHTML("beforeend", `<div class="styles__mainContainer___4TLvi-camelCase" style="z-index: 1;" id="themify__settings"></div>`);
            document.getElementsByClassName("styles__topRightRow___dQvxc-camelCase")[0].insertAdjacentHTML("afterbegin", `<div id="themify__addThemeButton" style="margin-bottom: 0.182vw;" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div><div class="styles__front___vcvuy-camelCase styles__buttonInsideNoMinWidth___39vdp-camelCase" style="background-color: #2f2f2f;"><i class="fas fa-plus" aria-hidden="true"></i></div></div>`);

            document.getElementById("themify__addThemeButton").addEventListener("click", async () => {
                const themeModal = `<div class="arts__modal___VpEAD-camelCase"><form class="styles__container___1BPm9-camelCase"><div class="styles__text___KSL4--camelCase">Add a theme:</div><div class="styles__holder___3CEfN-camelCase"><div style="flex-direction: column;" class="styles__numRow___xh98F-camelCase"><div style="border: 0.156vw solid rgba(0, 0, 0, 0.17);border-radius: 0.313vw;width: 90%;height: 2.604vw;margin: 0.000vw;display: flex;flex-direction: row;align-items: center;"><input style="border: none;height: 2.083vw;line-height: 2.083vw;font-size: 1.458vw;text-align: center;font-weight: 700;font-family: Nunito, sans-serif;color: #ffffff;background-color: #3f3f3f;outline: none;width: 100%;" placeholder="Theme URL" type="text" value=""></div></div><div class="styles__buttonContainer___2EaVD-camelCase"><div id="yesButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Yes</div></div><div id="noButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0"><div class="styles__shadow___3GMdH-camelCase"></div><div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div><div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">No</div></div></div></div><input type="submit" style="opacity: 0; display: none;"></form></div>`;
                document.body.insertAdjacentHTML("beforeend", themeModal);
                document.getElementById("yesButton").addEventListener("click", () => {
                    const theme = document.querySelector(".styles__numRow___xh98F-camelCase input").value;
                    if (theme) {
                        const themes = JSON.parse(localStorage.getItem("themify_themes"));
                        themes.push(theme);
                        localStorage.setItem("themify_themes", JSON.stringify(themes));
                        window.history.pushState({}, "", `/${page}`);
                        location.reload();
                    };
                });
                document.getElementById("noButton").addEventListener("click", () => {
                    window.history.pushState({}, "", `/${page}`);
                    location.reload();
                });
            });

            const themes = JSON.parse(localStorage.getItem("themify_themes"));
            for (let i = 0; i < themes.length; i++) {
                const theme = themes[i],
                    response = await fetch(theme),
                    css = await response.text(),
                    name = css.match(/==ThemifyTheme==\n\/\/ @name (.*)\n/)[1] || "Unnamed Theme",
                    desc = css.match(/\/\/ @description (.*)\n/)[1] || "No description",
                    themeButton = `<div class="styles__infoContainer___2uI-S-camelCase"><div class="styles__headerRow___1tdPa-camelCase"><i class="fas fa-palette styles__headerIcon___1ykdN-camelCase" aria-hidden="true"></i><div class="styles__infoHeader___1lsZY-camelCase">${name}</div></div><div class="styles__subscriptionText___2BvF7-camelCase">${desc}                                <label class="themify__switch" style="margin-left: 10px;"><input type="checkbox" ${theme === localStorage.getItem("themify_theme") ? "checked" : ""}><span class="themify__slider themify__round"></span></label></div></div>`;

                document.getElementById("themify__settings").insertAdjacentHTML("beforeend", themeButton);
                const currentThemeElement = document.getElementById("themify__settings").lastChild;
                currentThemeElement.querySelector('input[type="checkbox"]').addEventListener("change", () => {
                    if (currentThemeElement.querySelector('input[type="checkbox"]').checked) {
                        localStorage.setItem("themify_theme", theme);
                        window.history.pushState({}, "", `/${page}`);
                        location.reload();
                    } else {
                        localStorage.setItem("themify_theme", "");
                        window.history.pushState({}, "", `/${page}`);
                        location.reload();
                    };
                });
            };
        };
    });
})();
