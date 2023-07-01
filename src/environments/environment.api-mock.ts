export const environment = {
    production: false,
    env: 'api-mock',
    baseUrl: 'http://172.16.1.244:4001/facthos-core/api/v1/paciente',
    postUrl: 'http://172.16.1.243:4010/api-middleware-link-ris/api/v1/link-studie-check',
    sendMailUrl: 'http://172.16.1.244:4001/facthos-core/api/v1/send-ris-mail',
    // Microsoft authentication login settings
    clientId: 'c09f8fa4-5f78-4e59-b9ca-e45f039aa89b',
    tenantId: '66f958dc-73f2-4125-af5d-3ffe8851aefc',
    authority: 'https://login.microsoftonline.com/66f958dc-73f2-4125-af5d-3ffe8851aefc', 
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: "http://localhost:3000"
  };