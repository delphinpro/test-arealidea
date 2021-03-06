/**
 * Created with PhpStorm.
 *
 * @since        29.02.2016 18:12
 * @author       delphinpro delphinpro@yandex.ru
 * @copyright    copyright (C) 2016 delphinpro
 * @license      Licensed under the MIT license
 */

// take from php.js library
function uniqueId(prefix, moreEntropy) {
    let retId;
    moreEntropy      = !!moreEntropy;
    const formatSeed = function (seed, reqWidth) {
        seed = parseInt(seed, 10).toString(16); // to hex str
        if (reqWidth < seed.length) {
            // so long we split
            return seed.slice(seed.length - reqWidth);
        }
        if (reqWidth > seed.length) {
            // so short we pad
            return Array(1 + (reqWidth - seed.length)).join('0') + seed;
        }
        return seed;
    };

    if (!this.php_js) {
        this.php_js = {}
    }
    if (!this.php_js.uniqidSeed) {
        this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    }
    this.php_js.uniqidSeed++;

    retId = prefix || '';
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5);

    if (moreEntropy) { /* *** */
        // for more entropy we add a float lower to 10
        retId += (Math.random() * 10).toFixed(8).toString();
    }

    return retId;
}

function pixelGlass(points) {
    if (typeof  points !== 'object') {
        console.warn('Invalid param type for pixelGlass()');
        return '';
    }

    let bp, s = `<!-- Pixel Glass. Удалить эти стили. Нужны только для верстальщика! -->\n<style>\n`;

    for (bp of Object.keys(points)) {
        if (bp === '_keys') continue;
        s += `@media(min-width:${bp}){html{background:url("${points[bp]}") no-repeat 50% 0;}}\n`;
    }

    s += `</style><!-- // Pixel Glass -->\n`;

    return s;
}

function svgIcon(name, css) {
    return `<svg class="i i-${name} ${css}"><use xlink:href="design/images/svg-sprite.svg#${name}"></use></svg>`;
}

module.exports = [
    {name: "svgIcon", func: svgIcon},
    {name: "pixelGlass", func: pixelGlass},
    {name: "uniqueId", func: uniqueId}
];
