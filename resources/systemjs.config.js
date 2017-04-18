(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            "npm:": "node_modules/"
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: "app",

            // angular bundles
            "@angular/core": "node_modules/@angular/core/bundles/core.umd.js",
            "@angular/common": "node_modules/@angular/common/bundles/common.umd.js",
            "@angular/compiler": "node_modules/@angular/compiler/bundles/compiler.umd.js",
            "@angular/platform-browser": "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
            "@angular/platform-browser-dynamic": "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
            "@angular/http": "node_modules/@angular/http/bundles/http.umd.js",
            "@angular/router": "node_modules/@angular/router/bundles/router.umd.js",
            "@angular/forms": "node_modules/@angular/forms/bundles/forms.umd.js",

            // other libraries
            "rxjs": "node_modules/rxjs",
            "angular-in-memory-web-api": "node_modules/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js",
            "jquery": "node_modules/jquery",
            "materialize-css": "node_modules/materialize-css",
            "angular2-materialize": "node_modules/angular2-materialize",
            "moment": "node_modules/moment"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: "./app.js",
                defaultExtension: "js"
            },
            rxjs: {
                defaultExtension: "js"
            },
            "jquery": {
                main: "dist/jquery.js"
            },
            "materialize-css": {
                main: "dist/js/materialize"
            },
            "angular2-materialize": {
                main: "dist/index.js"
            },
            "moment": {
                main: "moment",
                defaultExtension: "js"
            }
        },
        meta: {
            "moment": {format: "global"},
            "node_modules/jquery/dist/jquery.js": {
                format: "global"
            },
            "node_modules/materialize-css/dist/js/materialize.js": {
                format: "global"
            }
        }
    });
})(this);