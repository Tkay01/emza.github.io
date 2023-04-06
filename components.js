const navbar = function () {
    return {
        open: false,
        entries: [
            { name: 'home', targetSection: '#home' },
            { name: 'about', targetSection: '#about' },
            { name: 'skills', targetSection: '#skills' },
            { name: 'experience', targetSection: '#experience' },
            { name: 'contact', targetSection: '#contact' },
        ],
    };
};
window.$navbar = navbar;

const home = function () {
    let $refs;

    return {
        setup(refs) {
            $refs = refs;
        },
        async fireworks(durationInSeconds) {
            const duration = durationInSeconds * 1000;
            const end = Date.now() + duration;

            (function frame() {
                // launch a few confetti from the left edge
                window.confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                });
                // and launch a few from the right edge
                window.confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                });

                // keep going until we are out of time
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        },
        // Based on:
        // https://stackoverflow.com/a/30358006/2251135
        play() {
            this.showVideo = true;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        },
        hide() {
            this.showVideo = false;
            $refs.youtubeEmbeddedVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        },
        showVideo: false,
    };
};
window.$home = home;

const skills = function () {
    return {
        languages: [
            {
                name: 'HTML',
                image: './html5.svg',
                description:
                    'HTML is essential for creating web content with a wide range of applications, constantly evolving to meet changing needs and remaining vital.',
            },
            {
                name: 'CSS',
                image: './css.svg',
                description: 'CSS is critical for creating visually appealing and consistent web designs across devices and platforms.',
            },
            {
                name: 'JavaScript',
                image: './js.svg',
                description:
                    'JavaScript has grown to become one of the most popular programming languages in the world, with a large and active developer community.',
            },
        ],
        async load() {
            const res = await fetch('https://nextjs-red-six-46.vercel.app/api/wakatime/danielcamargo', { method: 'GET' });
            const stats = await res.json();
            const { data } = stats;
            const languagesIWant = ['HTML', 'CSS', 'JavaScript'];
            const languageStatsList = data.languages.filter(l => languagesIWant.indexOf(l.name) !== -1);
            for (let i = 0; i < languageStatsList.length; i++) {
                const languageStats = languageStatsList[i];
                const targetLanguage = this.languages.find(l => l.name === languageStats.name);
                targetLanguage.hours = languageStats.hours;
                targetLanguage.decimal = languageStats.decimal;
            }
        },
        progress(language) {
            const percentage = (language.decimal / 320) * 100;
            return `${percentage}%`;
        },
    };
};
window.$skills = skills;

const experience = function () {
    return {
        entries: [
            {
                place: 'school on campus',
                date: 'Jan 2022 - Jan 2023',
                description: `
                <p>
                    Working on projects and finding solutions to problems presented to us and even going further to make our websites look great
                    and user friendly. worked tirelessly through out that time to improve my coding skills, so that l can change the world.
                    <span class="text-teal-400">utilized the following languages</span>  css, java script and html.
                </p>
                `,
            },
            {
                place: 'school-online',
                date: 'jan 2020 - Jan 2022',
                description: `
                <p>
                 In 2020, while studying online, I decided to take on a few programming projects to help build my skills and gain
                 some hands-on experience. I was excited to use some of the languages I had learned in my courses, including C++,
                 Java, Python, and JavaScript.
                </p>
                `,
            },
        ],
    };
};

window.$experience = experience;
