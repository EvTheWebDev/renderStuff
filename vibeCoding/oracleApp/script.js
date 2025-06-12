class HackerTypingGame {
    constructor() {
        this.targetText = document.getElementById('target-text');
        this.consoleOutput = document.getElementById('console-output');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.wpmDisplay = document.getElementById('wpm');
        this.progressDisplay = document.getElementById('progress');
        this.intrusionContainer = document.getElementById('intrusion-container');
        this.currentTextIndex = 0;
        this.startTime = null;
        this.mistakes = 0;
        this.totalCharacters = 0;
        this.matrixBackground = document.getElementById('matrix-background');
        this.completedPhrases = 0;
        this.targetPhrasesToWin = 8;
        this.gameActive = true;

        this.hackingPhrases = [
            "Initiating mainframe breach protocol...",
            "Bypassing security algorithms...",
            "Decrypting neural network firewalls...",
            "Accessing classified database records...",
            "Override successful. System compromised.",
            "Deploying advanced encryption bypass...",
            "Infiltrating secure network protocols...",
            "Executing binary exploitation vectors...",
            "Quantum encryption matrix detected...",
            "Implementing zero-day vulnerability..."
        ];

        this.intrusions = [
            "SECURITY BREACH DETECTED",
            "INITIATING COUNTERMEASURES",
            "FIREWALL ENGAGED",
            "TRACING CONNECTION",
            "SYSTEM LOCKDOWN IMMINENT",
            "ANTI-VIRUS DEPLOYED",
            "UNAUTHORIZED ACCESS",
            "DEFENSIVE PROTOCOLS ACTIVE"
        ];

        this.initializeGame();
        this.setupMatrixBackground();
        this.createParticleEffect = this.createParticleEffect.bind(this);
        this.setupCursor();
        this.startIntrusions();
    }

    setupCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'current-char-cursor';
        this.targetText.parentElement.appendChild(this.cursor);
        this.updateCursorPosition();
    }

    updateCursorPosition() {
        const textMetrics = this.targetText.getBoundingClientRect();
        const charWidth = textMetrics.width / this.currentPhrase.length;
        this.cursor.style.left = `${textMetrics.left + (this.currentTextIndex * charWidth) - this.targetText.parentElement.offsetLeft}px`;
    }

    startIntrusions() {
        setInterval(() => {
            if (this.gameActive) {
                this.createIntrusion();
            }
        }, 3000);
    }

    createIntrusion() {
        const intrusion = document.createElement('div');
        intrusion.className = 'intrusion';
        intrusion.textContent = this.intrusions[Math.floor(Math.random() * this.intrusions.length)];
        
        // Random position
        intrusion.style.left = `${Math.random() * 80}%`;
        intrusion.style.top = `${Math.random() * 80}%`;
        
        this.intrusionContainer.appendChild(intrusion);
        setTimeout(() => intrusion.remove(), 2000);
    }

    initializeGame() {
        this.currentPhrase = this.getRandomPhrase();
        this.targetText.textContent = this.currentPhrase;
        this.currentTextIndex = 0;
        this.startTime = null;
        this.mistakes = 0;
        this.totalCharacters = 0;
        this.progressDisplay.textContent = this.completedPhrases;

        document.addEventListener('keydown', this.handleKeypress.bind(this));
    }

    getRandomPhrase() {
        return this.hackingPhrases[Math.floor(Math.random() * this.hackingPhrases.length)];
    }

    setupMatrixBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        this.matrixBackground.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズブヅプエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン0123456789";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            if (!this.gameActive) return;
            
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(draw, 35);
    }

    showWinScreen() {
        const winScreen = document.createElement('div');
        winScreen.className = 'win-screen';
        
        const message = document.createElement('div');
        message.className = 'win-message';
        message.innerHTML = 'SYSTEM COMPROMISED<br>ACCESS GRANTED<br><br>Mission Successful!';
        
        winScreen.appendChild(message);
        document.body.appendChild(winScreen);
    }

    createParticleEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    }

    updateConsoleOutput(text, isSuccess = false) {
        const line = document.createElement('div');
        line.textContent = `> ${text}`;
        if (isSuccess) {
            line.classList.add('success-message');
        }
        this.consoleOutput.appendChild(line);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
    }

    calculateWPM() {
        if (!this.startTime) return 0;
        const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // in minutes
        return Math.round((this.totalCharacters / 5) / timeElapsed);
    }

    calculateAccuracy() {
        return Math.round(((this.totalCharacters - this.mistakes) / this.totalCharacters) * 100) || 100;
    }

    handleKeypress(event) {
        if (!this.gameActive) return;

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        const expectedChar = this.currentPhrase[this.currentTextIndex];
        
        if (event.key === expectedChar) {
            this.totalCharacters++;
            this.currentTextIndex++;
            
            // Create particle effect at cursor position
            const rect = this.targetText.getBoundingClientRect();
            const x = rect.left + this.currentTextIndex * 10; // Approximate character width
            const y = rect.top;
            this.createParticleEffect(x, y);

            // Update display
            const typed = this.currentPhrase.substring(0, this.currentTextIndex);
            const remaining = this.currentPhrase.substring(this.currentTextIndex);
            this.targetText.innerHTML = `<span class="correct">${typed}</span>${remaining}`;

            // Update cursor position
            this.updateCursorPosition();

            // Update stats
            this.wpmDisplay.textContent = this.calculateWPM();
            this.accuracyDisplay.textContent = this.calculateAccuracy();

            // Check if phrase is completed
            if (this.currentTextIndex >= this.currentPhrase.length) {
                this.completedPhrases++;
                this.progressDisplay.textContent = this.completedPhrases;
                this.updateConsoleOutput(this.currentPhrase, true);

                if (this.completedPhrases >= this.targetPhrasesToWin) {
                    this.gameActive = false;
                    this.showWinScreen();
                    return;
                }

                this.currentPhrase = this.getRandomPhrase();
                this.targetText.textContent = this.currentPhrase;
                this.currentTextIndex = 0;
                this.updateCursorPosition();
            }
        } else {
            this.mistakes++;
            this.accuracyDisplay.textContent = this.calculateAccuracy();
            
            // Visual feedback for mistake
            this.targetText.classList.add('incorrect');
            setTimeout(() => this.targetText.classList.remove('incorrect'), 100);
        }
    }
}

// Initialize the game when the window loads
window.addEventListener('load', () => {
    new HackerTypingGame();
});