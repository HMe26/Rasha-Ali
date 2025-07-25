document.addEventListener("DOMContentLoaded", () => {
  // 1. منع النقرة اليمنى (Right-Click)
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    // يمكن إضافة رسالة تنبيه هنا للمستخدم
    // alert('النسخ غير مسموح به في هذا الموقع.');
  });

  // 2. منع تحديد ونسخ النص (Text Selection/Copy)
  // تم إضافة -webkit-user-select: none; وغيرها في CSS body لتغطية معظم المتصفحات.
  // هذا الجزء من JS يمكن أن يكون بديلاً أو إضافة:
  document.body.onselectstart = function () {
    return false;
  }; // For IE
  document.body.oncopy = function () {
    return false;
  }; // For modern browsers

  // 3. التحقق من تحميل الفيديو لتشغيل تأثير الفتح التدريجي (Fade-in)
  const videoElement = document.getElementById("background-video");
  const videoOverlay = document.getElementById("video-overlay");

  if (videoElement) {
    videoElement.addEventListener("canplaythrough", () => {
      // الفيديو جاهز للتشغيل بالكامل
      videoElement.classList.add("video-loaded");
      videoOverlay.classList.add("video-loaded");
    });
    // في حالة فشل التحميل أو عدم وجود الفيديو، تأكد من إظهار المحتوى
    videoElement.addEventListener("error", () => {
      videoElement.style.display = "none"; // إخفاء الفيديو
      videoOverlay.style.display = "none"; // إخفاء الطبقة
      document.body.style.background =
        "linear-gradient(135deg, var(--background-light) 0%, var(--background-dark) 100%)"; // إرجاع الخلفية المتدرجة
    });
    // إذا كان الفيديو يتم تحميله بسرعة كبيرة، يمكن تشغيل الفيد إن فورًا
    if (videoElement.readyState >= 3) {
      // 3 means enough data to play
      videoElement.classList.add("video-loaded");
      videoOverlay.classList.add("video-loaded");
    }
  } else {
    // إذا لم يكن هناك عنصر فيديو، تأكد من إظهار الخلفية العادية
    document.body.style.background =
      "linear-gradient(135deg, var(--background-light) 0%, var(--background-dark) 100%)";
    document.body.style.backgroundColor = ""; // Remove fixed black if no video
  }

  // 4. رسالة ترحيبية بسيطة (اختياري - تظهر مرة واحدة عند الزيارة)
  // يمكن استخدام localStorage لمنع ظهورها في كل مرة
  if (!localStorage.getItem("welcomedUser")) {
    setTimeout(() => {
      alert(
        "أهلاً وسهلاً بك في صفحة ميس رشا علي! نتمنى لك تجربة تعليمية مميزة."
      );
      localStorage.setItem("welcomedUser", "true");
    }, 2000); // تظهر بعد 2 ثانية
  }

  // 5. تعطيل ميزة سحب وإفلات الصور (Drag and Drop)
  document.addEventListener("dragstart", function (e) {
    if (e.target.tagName.toLowerCase() === "img") {
      e.preventDefault();
    }
  });

  // 6. إضافة تأثيرات حركية خفيفة عند التمرير (إذا كان هناك محتوى طويل)
  // هذا يتطلب عناصر HTML محددة مع كلاسات معينة ليتم تطبيق التأثير عليها
  // مثال: عناصر تظهر بتأثير "Fade In Up" عند دخولها شاشة العرض
  const faders = document.querySelectorAll(".fade-in-on-scroll");
  const appearOptions = {
    threshold: 0.1, // Element is 10% in viewport
    rootMargin: "0px 0px -50px 0px", // Start earlier or later
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // يمكنك إضافة كلاس 'fade-in-on-scroll' لأي عنصر تريده أن يظهر بتأثير تدريجي عند التمرير إليه
  // مثال: <div class="arabic-text-container fade-in-on-scroll">...</div>
  // سأضيف كلاس CSS بسيط لهذا التأثير
});
