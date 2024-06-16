// ==UserScript==
// @name         oj.uz solve count hider
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hides the solve count on oj.uz/problems/* ans oj.uz/problem/view/* pages.
// @author       Samik Goyal
// @match        https://oj.uz/problems/*
// @match        https://oj.uz/problems
// @match        https://oj.uz/problem/view/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.href.startsWith('https://oj.uz/problems')) {
        var xpath = '//*[@id="content"]/div/div[2]/table/tbody/tr';
        var rows = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < rows.snapshotLength; i++) {
            var row = rows.snapshotItem(i);
            var tds = row.querySelectorAll('td');
            if (tds.length > 1) {
                var lastTd = tds[tds.length - 1];
                row.removeChild(lastTd);
            }
        }
    } else if (window.location.href.startsWith('https://oj.uz/problem/view')) {
        var tableRow = document.evaluate('//*[@id="content"]/div/div/div[1]/div[2]/table/tbody/tr', document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (tableRow) {
            var children = tableRow.children;
            if (children.length > 2) {
                for (var j = children.length - 1; j > 1; j--) {
                    tableRow.removeChild(children[j]);
                }
            }
        }
    }
})();
