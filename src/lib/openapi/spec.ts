export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Bobusang API",
    version: "2.0.0",
    description: "Bobusang v2 API specification.",
  },
  servers: [
    {
      url: "/",
      description: "Current host",
    },
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "서버 상태 확인",
        description: "Bobusang 서버가 정상적으로 응답하는지 확인한다.",
        responses: {
          "200": {
            description: "서버가 정상적으로 응답함",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["ok", "service", "checkedAt"],
                  properties: {
                    ok: {
                      type: "boolean",
                      example: true,
                    },
                    service: {
                      type: "string",
                      example: "bobusang",
                    },
                    checkedAt: {
                      type: "string",
                      format: "date-time",
                      example: "2026-05-26T06:40:00.000Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
} as const;
