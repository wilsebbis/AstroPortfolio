type RoleMeta = {
    id: string;
    title: string;
    skills: string;
    highlightClass: string;
};

const carousel = document.getElementById("rolesCarousel") as HTMLDivElement | null;
const typeTarget = document.getElementById("typewriterText") as HTMLSpanElement | null;
const titleLive = document.getElementById("roleTitleLive") as HTMLSpanElement | null;

if (carousel && typeTarget && titleLive) {
    const cards = Array.from(carousel.querySelectorAll<HTMLElement>(".role-card"));

    const roles: RoleMeta[] = cards.map((el) => ({
        id: el.dataset.roleId!,
        title: el.dataset.roleTitle!,
        skills: el.dataset.roleSkills!,
        highlightClass: el.dataset.roleHighlight!,
    }));

    /**
     * Determine "leftmost visible" card.
     * We choose the card whose left edge is closest to the carousel's left padding.
     */
    function getLeftmostVisibleCardIndex(): number {
        const parentRect = carousel!.getBoundingClientRect();
        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        cards.forEach((card, i) => {
            const r = card.getBoundingClientRect();
            const visible = r.right > parentRect.left && r.left < parentRect.right;
            if (!visible) return;

            const dist = Math.abs(r.left - parentRect.left);
            if (dist < bestDist) {
                bestDist = dist;
                bestIdx = i;
            }
        });

        return bestIdx;
    }

    let activeIndex = 0;

    function applyActiveStyles(nextIndex: number) {
        activeIndex = nextIndex;

        // Clear all highlights
        cards.forEach((c) => {
            c.classList.remove("ring-2", "shadow-xl");
            // Remove any previous role highlight classes
            roles.forEach((r) => c.classList.remove(...r.highlightClass.split(" ")));
            c.classList.remove("scale-[1.01]");
            c.classList.add("opacity-85");
        });

        const card = cards[activeIndex];
        const role = roles[activeIndex];

        // Add highlight to active
        card.classList.add("ring-2", "shadow-xl", "scale-[1.01]");
        card.classList.remove("opacity-85");
        role.highlightClass.split(" ").forEach((cls) => card.classList.add(cls));

        // Update title + typewriter
        titleLive!.textContent = role.title;
        typewriter.setText(role.skills);
    }

    class Typewriter {
        private el: HTMLElement;
        private current = "";
        private target = "";
        private typing = false;
        private token = 0;

        // timings
        private typeDelay = 24;   // ms per char
        private eraseDelay = 16;  // ms per char
        private holdMs = 900;

        constructor(el: HTMLElement) {
            this.el = el;
        }

        setText(next: string) {
            // Cancel any in-flight animation
            this.token++;
            const myToken = this.token;

            this.target = next;
            this.run(myToken).catch(() => { });
        }

        private async run(myToken: number) {
            if (this.typing) return;
            this.typing = true;

            // 1) erase current
            while (this.current.length > 0) {
                if (myToken !== this.token) { this.typing = false; return; }
                this.current = this.current.slice(0, -1);
                this.el.textContent = this.current;
                await sleep(this.eraseDelay);
            }

            // small pause
            await sleep(140);

            // 2) type target
            for (let i = 0; i <= this.target.length; i++) {
                if (myToken !== this.token) { this.typing = false; return; }
                this.current = this.target.slice(0, i);
                this.el.textContent = this.current;
                await sleep(this.typeDelay);
            }

            // 3) hold
            await sleep(this.holdMs);

            this.typing = false;
        }
    }

    function sleep(ms: number) {
        return new Promise<void>((res) => setTimeout(res, ms));
    }

    const typewriter = new Typewriter(typeTarget);

    let rafPending = false;

    carousel.addEventListener("scroll", () => {
        if (rafPending) return;
        rafPending = true;

        requestAnimationFrame(() => {
            rafPending = false;
            const idx = getLeftmostVisibleCardIndex();
            if (idx !== activeIndex) applyActiveStyles(idx);
        });
    });

    // Auto-advance logic
    let autoTimer: number | null = null;
    let userInteracting = false;

    function scrollToIndex(idx: number) {
        const target = cards[idx];
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }

    function startAutoAdvance() {
        stopAutoAdvance();
        autoTimer = window.setInterval(() => {
            if (userInteracting) return;
            const next = (activeIndex + 1) % cards.length;
            scrollToIndex(next);
        }, 4200);
    }

    function stopAutoAdvance() {
        if (autoTimer) window.clearInterval(autoTimer);
        autoTimer = null;
    }

    function markInteraction() {
        userInteracting = true;
        window.setTimeout(() => (userInteracting = false), 2500);
    }

    carousel.addEventListener("pointerdown", markInteraction);
    carousel.addEventListener("wheel", markInteraction, { passive: true });
    carousel.addEventListener("touchstart", markInteraction, { passive: true });
    carousel.addEventListener("mouseenter", () => (userInteracting = true));
    carousel.addEventListener("mouseleave", () => (userInteracting = false));

    // Initialize
    applyActiveStyles(0);
    startAutoAdvance();
}
