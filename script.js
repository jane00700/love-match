document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       GOOGLE APPS SCRIPT URL
    ======================================== */

    const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxXkJHAt3QEAZ8deh_xCQAUGTlm5wb6YIAveiyHXSXa9Ud9JKvu_qHx78uTpB9bNgFQ/exec";


    /* ========================================
       MOBILE MENU
    ======================================== */

    const menuButton =
        document.querySelector(".mobile-menu-btn");

    const mobileNav =
        document.querySelector(".mobile-nav");


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

    const modal =
        document.getElementById("applyModal");

    const applyButtons =
        document.querySelectorAll(".js-apply");

    const closeButton =
        document.querySelector(".modal-close");

    const modalOverlay =
        document.querySelector(".modal-overlay");


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
       FORM SUBMIT
    ======================================== */

    const form =
        document.getElementById("applyForm");


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const gender =
                document.querySelector(
                    'input[name="gender"]:checked'
                );


            const age =
                document
                    .getElementById("age")
                    .value;


            const contact =
                document
                    .getElementById("contact")
                    .value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    .value
                    .trim();

            const mbti =
                document
                    .getElementById("mbti")
                    .value;

            const agree =
                document
                    .getElementById("agree")
                    .checked;

            const traits = Array.from(
                document.querySelectorAll(
                    'input[name="traits"]:checked'
                )
            ).map(function (checkbox) {
                return checkbox.value;
            });

            const traitsText = traits.join(", ");


            const avoid = Array.from(
                document.querySelectorAll(
                    'input[name="avoidTraits"]:checked'
                )
            ).map(function (checkbox) {
                return checkbox.value;
            });

            const avoidTraitsText = avoid.join(", ");

            const preferred = Array.from(
                document.querySelectorAll(
                    'input[name="preferredTraits"]:checked'
                )
            ).map(function (checkbox) {
                return checkbox.value;
            });

            const preferredTraitsText = avoid.join(", ");


            /* -------------------------
               Validation
            ------------------------- */

            if (!name) {

                alert(
                    "이름을 입력해주세요."
                );

                return;
            }


            if (!gender) {

                alert(
                    "성별을 선택해주세요."
                );

                return;
            }


            if (!age) {

                alert(
                    "나이를 입력해주세요."
                );

                return;
            }


            if (!contact) {

                alert(
                    "연락처를 입력해주세요."
                );

                return;
            }


            if (!agree) {

                alert(
                    "개인정보 수집 및 이용에 동의해주세요."
                );

                return;
            }


            /* -------------------------
               Button
            ------------------------- */

            const submitButton =
                form.querySelector(
                    ".form-submit"
                );


            submitButton.disabled = true;

            submitButton.textContent =
                "신청하는 중... 💕";


            /* -------------------------
               Send to Google Sheets
            ------------------------- */

            const formData =
                new URLSearchParams();


            formData.append(
                "name",
                name
            );

            formData.append(
                "gender",
                gender.value
            );

            formData.append(
                "age",
                age
            );

            formData.append(
                "contact",
                contact
            );

            formData.append(
                "message",
                message
            );

            formData.append(
                "avoid",
                avoidTraitsText
            );

            formData.append(
                "preferred",
                preferredTraitsText
            );

            formData.append(
                "mbti",
                mbti
            );

            formData.append(
                "traits",
                traitsText
            );

            try {

                /*
                 * Google Apps Script는
                 * 다른 도메인에서 호출되므로
                 * no-cors를 사용합니다.
                 *
                 * 실제 데이터는 Google Sheet에
                 * 정상적으로 저장됩니다.
                 */

                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "application/x-www-form-urlencoded"
                        },

                        body: formData.toString()
                    }
                );


                /* -------------------------
                   Success
                ------------------------- */

                alert(
                    name +
                    "님, 신청이 완료되었습니다! 💕\n\n" +
                    "좋은 인연이 찾아오길 바랄게요 :)"
                );


                form.reset();

                closeModal();


            } catch (error) {

                console.error(error);

                alert(
                    "신청 중 문제가 발생했습니다.\n" +
                    "잠시 후 다시 시도해주세요."
                );


            } finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "신청 완료하기 ♥";

            }

        }
    );


    /* ========================================
       PHONE NUMBER FORMAT
    ======================================== */

    const contactInput =
        document.getElementById("contact");


    contactInput.addEventListener(
        "input",
        function () {

            let value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );


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

function limitCheckboxes(name, maxCount) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {

            const checkedCount =
                document.querySelectorAll(`input[name="${name}"]:checked`).length;

            if (checkedCount >= maxCount) {
                checkboxes.forEach(item => {
                    if (!item.checked) {
                        item.disabled = true;
                    }
                });
            } else {
                checkboxes.forEach(item => {
                    item.disabled = false;
                });
            }
        });
    });
}

// 이것만은 안돼요 → 최대 2개
limitCheckboxes('avoidTraits', 2);

// 이런 사람 좋아요 → 최대 3개
limitCheckboxes('preferredTraits', 3);

