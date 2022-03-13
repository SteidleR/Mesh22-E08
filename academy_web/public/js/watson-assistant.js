window.watsonAssistantChatOptions = {
    integrationID: "a2d99168-2b06-4a23-8c8b-2ca8d46b0ef2", // The ID of this integration.
    region: "eu-gb", // The region your integration is hosted in.
    serviceInstanceID: "6d0a6a10-f913-46f5-852e-95475e721848", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
};
setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js"
    document.head.appendChild(t);
});