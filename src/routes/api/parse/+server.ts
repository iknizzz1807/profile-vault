import { json } from "@sveltejs/kit";
import { GEMINI_API_KEY } from "$env/static/private";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const POST = async ({ request }) => {
  const { textContent } = await request.json();

  if (!textContent) {
    return json({ error: "Không có nội dung để phân tích" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    const prompt = `
        Phân tích văn bản sau đây được trích xuất từ CV của một người. 
        Nhiệm vụ của bạn là cấu trúc hóa thông tin thành một đối tượng JSON hợp lệ duy nhất.
        Đối tượng phải có các khóa sau: "profileInfo", "summary", "workExperiences", "educations", "projects", "skills".
        - "workExperiences", "educations", "projects", "skills" phải là một mảng các đối tượng.
        - "profileInfo" và "summary" là một đối tượng duy nhất.
        - Giữ lại ngôn ngữ gốc của văn bản (ví dụ: tiếng Việt).
        - Nếu không tìm thấy thông tin cho một trường nào đó, hãy để giá trị là chuỗi rỗng "" hoặc mảng rỗng [].
        - Đảm bảo đầu ra chỉ là một JSON object, không có ký tự thừa hay markdown formatting (như \`\`\`json).

        Schema tham khảo:
        \`\`\`typescript
        interface ProfileInfo { fullName: string; email: string; phoneNumber: string; website: string; }
        interface Summary { content: string; }
        interface WorkExperience { jobTitle: string; companyName: string; startDate: string; endDate: string | null; description: string; }
        interface Education { institution: string; degree: string; fieldOfStudy: string; startDate: string; endDate: string | null; }
        interface Project { projectName: string; technologies: string; description: string; }
        interface Skill { category: string; skills: string; }
        \`\`\`

        Văn bản cần phân tích:
        ---
        ${textContent}
        ---
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsedData = JSON.parse(cleanedText);

    return json(parsedData);
  } catch (error: any) {
    console.error("Lỗi phân tích từ AI:", error);
    return json(
      { error: "Không thể phân tích dữ liệu từ AI", details: error.message },
      { status: 500 }
    );
  }
};
