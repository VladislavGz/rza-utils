
export function getScrambledText(originalText: string, options: {
    charset: string;
    revealSpeed: number;
} = {
        charset: '!@#$%^&*()_{}[]<>?+',
        revealSpeed: 10
    }) {
    const { charset, revealSpeed } = options;

    let displayText = $state('____________');
    let revealedCount = 0;

    const interval = setInterval(() => {
        if (revealedCount >= originalText.length) {
            displayText = originalText;
            clearInterval(interval);
            return;
        }

        displayText = originalText
            .split('')
            .map((char, i) => {
                if (i < revealedCount) return char;
                return charset[Math.floor(Math.random() * charset.length)];
            })
            .join('');

        if (Math.random() > 0.7) {
            revealedCount++;
        }
    }, revealSpeed);

    return {
        get text() {
            return displayText;
        },

        destroy() {
            clearInterval(interval);
        }
    }
}