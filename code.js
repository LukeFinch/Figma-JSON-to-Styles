// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__, { width: 400, height: 250 });
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    if (msg.type === 'delete-all') {
        figma.getLocalEffectStyles().forEach(style => style.remove());
        figma.getLocalPaintStyles().forEach(style => style.remove());
        figma.getLocalTextStyles().forEach(style => style.remove());
    }
    if (msg.type === 'import-style') {
        //Text  styles
        let textStyles = msg.style.texts;
        textStyles.forEach((data) => __awaiter(this, void 0, void 0, function* () {
            yield figma.loadFontAsync(data.fontName);
            let text = figma.createTextStyle();
            text.name = data.name;
            text.fontName = data.fontName;
            text.fontSize = data.fontSize;
            text.lineHeight = { unit: "PIXELS", value: data.lineHeight };
        }));
        //Paints (Colour fills)
        let paints = msg.style.paints;
        paints.forEach(data => {
            let paint = figma.createPaintStyle();
            paint.name = data.name;
            switch (data.type) {
                case "SOLID":
                    paint.paints = [{ type: data.type, color: data.color, opacity: data.opacity }];
                    break;
            }
        });
        let shadows = msg.style.shadows;
        shadows.forEach(data => {
            let shadow = figma.createEffectStyle();
            shadow.effects = data.effects;
            shadow.name = data.name;
        });
        let blurs = msg.style.blurs;
        blurs.forEach(data => {
            let blur = figma.createEffectStyle();
            blur.effects = data.effects;
            blur.name = data.name;
        });
    }
};
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
//  figma.closePlugin();
