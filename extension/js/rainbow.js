var c = document.getElementsByTagName("span"),
    rainbows = Array(),
    rainbowX = 0;

const rainbowInit = () => {
    for (var i = 0, n = c.length; i < n; ++i) {
        if (c.item(i).className == "rainbow") {
            rainbows.push(c.item(i));
        }
    }
    for (var i in rainbows) {
        console.log(rainbows)
        if (!rainbows) return;
        var e = rainbows[i],
            j, t, s;
        t = e.firstChild.nodeValue.split("");
        e.removeChild(e.firstChild);
        for (j in t) {
            s = document.createElement("span");
            s.appendChild(document.createTextNode(t[j]));
            e.appendChild(s);
        }
    }
}
rainbowInit();
rainbow();
setInterval(rainbow, 50);

function rainbow() {
    if (!rainbows) return;
    for (var rb in rainbows) {
        for (var ch = rainbows[rb].childNodes, i = 0, n = ch.length; i < n; ++i) {
            var x = ((rainbowX + i) % 16) / 16 * 360,
                y = (x - Math.floor(x / 60) * 60) / 60,
                r, g, b;
            if (x < 60) {
                r = 255;
                g = 255 * y;
                b = 0
            } else if (x < 120) {
                r = 255 - 255 * y;
                g = 255;
                b = 0
            } else if (x < 180) {
                r = 0;
                g = 255;
                b = 255 * y
            } else if (x < 240) {
                r = 0;
                g = 255 - 255 * y;
                b = 255
            } else if (x < 300) {
                r = 255 * y;
                g = 0;
                b = 255
            } else {
                r = 255;
                g = 0;
                b = 255 - 255 * y
            }
            ch.item(i).style.color = "#" + ((0x1000000 | b | (g << 8) | (r << 16)).toString(16).substr(1));
        }
    }
    ++rainbowX;
}
