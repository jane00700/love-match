document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuButton = document.querySelector(".mobile-menu-btn");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuButton && mobileNav) {

        menuButton.addEventListener("click", function () {

            mobileNav.classList.toggle("active");

        });


        mobileNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileNav.classList.remove("active");

            });

        });

    }


    /* ========================================
       MODAL
    ======================================== */

    const modal = document.getElementById("applyModal");
    const applyButtons = document.querySelectorAll(".js-apply");
    const closeButton = document.querySelector(".modal-close");
    const modalOverlay = document.querySelector(".modal-overlay");


    function openModal() {

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        setTimeout(function () {

            const nameInput =
                document.getElementById("name");

            if (nameInput) {
                nameInput.focus();
            }

        }, 200);

    }


    function closeModal() {

        modal.classList.remove("active");

        document.body.style.overflow = "";

    }


    applyButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            openModal();

        });

    });


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {
                closeModal();
            }

        }
    );


    /* ========================================
       FORM
    ======================================== */

    const form =
        document.getElementById("applyForm");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const gender =
            document.querySelector(
                'input[name="gender"]:checked'
            );

        const age =
            document.getElementById("age").value;

        const contact =
            document.getElementById("contact").value.trim();

        const agree =
            document.getElementById("agree").checked;


        if (!name) {

            alert("이름을 입력해주세요.");

            return;

        }


        if (!gender) {

            alert("성별을 선택해주세요.");

            return;

        }


        if (!age) {

            alert("나이를 입력해주세요.");

            return;

        }


        if (!contact) {

            alert("연락처를 입력해주세요.");

            return;

        }


        if (!agree) {

            alert(
                "개인정보 수집 및 이용에 동의해주세요."
            );

            return;

        }


        /*
         * 실제 서비스에서는 여기에서
         *
         * fetch()
         * AJAX
         * API
         *
         * 등을 이용해서 서버로 전송하면 됩니다.
         */


        alert(
            name +
            "님, 신청이 완료되었습니다! 💕\n\n" +
            "좋은 인연이 찾아오길 바랄게요 :)"
        );


        form.reset();

        closeModal();

    });


    /* ========================================
       CONTACT AUTO FORMAT
    ======================================== */

    const contactInput =
        document.getElementById("contact");


    contactInput.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(/[^0-9]/g, "");


            if (value.length < 4) {

                this.value = value;

            } else if (value.length < 8) {

                this.value =
                    value.slice(0, 3) +
                    "-" +
                    value.slice(3);

            } else {

                this.value =
                    value.slice(0, 3) +
                    "-" +
                    value.slice(3, 7) +
                    "-" +
                    value.slice(7, 11);

            }

        }
    );


    /* ========================================
       SCROLL REVEAL
    ======================================== */

    const revealElements =
        document.querySelectorAll(
            ".recommend-card, .step, .event-box"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

});
