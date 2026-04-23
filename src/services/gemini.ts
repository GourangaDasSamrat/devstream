const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";

export interface GeminiSummaryResponse {
  summary: string;
  success: boolean;
  error?: string;
}

/**
 * Validates if the provided API key is valid by making a test call
 */
export async function validateGeminiApiKey(
  apiKey: string,
): Promise<{ valid: boolean; error?: string }> {
  try {
    const response = await fetch(
      `${GEMINI_API_BASE}/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "hello",
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        valid: false,
        error:
          error.error?.message ||
          "Invalid API key. Please check and try again.",
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Failed to validate API key: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Summarizes article content using Gemini API with user-provided API key
 */
export async function summarizeWithGemini(
  apiKey: string,
  content: string,
): Promise<GeminiSummaryResponse> {
  try {
    const prompt = `Please provide a concise summary of the following blog article content. The summary should be 2-3 paragraphs, capturing the main points and key takeaways:

${content}`;

    const response = await fetch(
      `${GEMINI_API_BASE}/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        summary: "",
        error:
          error.error?.message ||
          "Failed to generate summary. Please add a new API key.",
      };
    }

    const data = await response.json();
    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated";

    return {
      success: true,
      summary,
    };
  } catch (error) {
    return {
      success: false,
      summary: "",
      error: `Error generating summary: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
