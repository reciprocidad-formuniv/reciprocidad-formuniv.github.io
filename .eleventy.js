const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier-terser");
const { minify_sync } = require("terser");
const path = require("path");
const sizeOf = require("image-size");

module.exports = function (eleventyConfig) {
    // Copy files into the output directory
    eleventyConfig.addPassthroughCopy({"src/_passthrough": "/"});
    eleventyConfig.addPassthroughCopy({"src/_assets": "/assets"}, {filter: path => (path.indexOf('/partners') == -1)});

    // Move files in 'src/content' to root of site
    eleventyConfig.addFilter("dropContentFolder", function (path) {
        if (path.endsWith("/index")) {
            path = path.slice(0, -6);
        }

        const pathToDrop = "/content"
        if (path.indexOf(pathToDrop) !== 0) {
            return path;
        }

        return path.slice(pathToDrop.length);
    });

    // Change fileSlug value on index files
    eleventyConfig.addFilter("fixFileSlug", function(slug) {
        if (slug == "content") {
            return "index";
        }

        return slug;
    });

    // Process CSS files
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", {
        outputFileExtension: "css",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Process JS files
    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", {
        outputFileExtension: "js",
        compile: async function (input) {
            return async () => {
                return input;
            };
        },
    });

    // Minify output files
    eleventyConfig.addTransform("minify", function (content, outputPath) {
        const extname = path.extname(outputPath);
        switch (extname) {
            case ".html":
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                });
            case ".css":
                return new CleanCSS({level: 2}).minify(content).styles;
            case ".js":
                return minify_sync(content).code;
            default:
                return content;
        }
    });

    // Shortcode for questions
    eleventyConfig.addShortcode("pregunta", function(num, question, subtitle, answers) {
        let upDimensions = sizeOf(`src/_assets/img/questions/up.webp`);
        let downDimensions = sizeOf(`src/_assets/img/questions/down.webp`);

        let next = (num === 32 ? "/resultado" : `/q${num + 1}`);

        return `
            <section class="que-laureado">
                <h2>
                    ${subtitle}
                </h2>
            </section>

            <h3>
                ${question}
            </h3>

            <section class="cuestionario">
                <article class="pregunta">
                    <section class="respuestas">
                        <a href="${next}" class="${answers[0][1]}">
                            <figure>
                                <img src="/assets/img/questions/up.webp" alt="" width="${upDimensions.width}" height="${upDimensions.height}">
                            </figure>
                            <span>${answers[0][0]}</span>
                        </a>
                        <a href="${next}" class="${answers[1][1]}">
                            <figure>
                                <img src="/assets/img/questions/down.webp" alt="" width="${downDimensions.width}" height="${downDimensions.height}">
                            </figure>
                            <span>${answers[1][0]}</span>
                        </a>
                    </section>
                </article>
            </section>
        `;
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};
