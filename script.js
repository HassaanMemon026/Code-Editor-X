$(document).ready(function () {
    console.log("DOM fully loaded and parsed");

    let timeoutId; // Variable to store timeout ID

    const output = () => {
        // HTML content in iframe
        $("iframe").contents().find("html").html($("#htmlPanel").val());

        // CSS content in iframe
        $("iframe").contents().find("head").html('<style type="text/css">' + $("#cssPanel").val() + '</style>');

        try {
            clearTimeout(timeoutId); // Clear the previous timeout

            // JavaScript content from the text area
            const jsCode = $("#jsPanel").val();

            // Delay execution for 3 seconds only for alert, prompt, and confirm
            if (jsCode.includes("alert") || jsCode.includes("prompt") || jsCode.includes("confirm")) {
                timeoutId = setTimeout(() => {
                    // Inject JavaScript code in iframe using <script> tag
                    $("iframe").contents().find("body").append('<script>' + jsCode + '</script>');
                }, 3000); // Delay of 3 seconds
            } else {
                // Inject JavaScript code in iframe using <script> tag without delay
                $("iframe").contents().find("body").append('<script>' + jsCode + '</script>');
            }
        } catch (error) {
            console.error("JavaScript Error: " + error);
        }
    };

    // Handling panel buttons
    $(".panelBtn").click(function () {
        $(this).toggleClass("panelActive");
        let panelId = $(this).attr("id") + "Panel";
        $("#" + panelId).toggleClass("hidden");
        let numberOfActivePanel = 4 - $(".hidden").length;
        $(".panel").width(($(window).width() / numberOfActivePanel) - 35);
    });

    // Set initial height and width
    $(".tai").height($(window).height() - $("header").height() - 29);
    $(".panel").width(($(window).width() / 2) - 35);

    // Output preview initially
    output();

    // Update iframe content on textarea change
    $("textarea").on('change keyup paste', function () {
        output();
    });
});
