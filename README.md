### profile-vault

- Mục đích của dự án: bạn có đống tài liệu tạp nham nhiều định dạng nhiều file khác nhau mà khó, lười tổng hợp lại thành hồ sơ, resume, porfolio duy nhất
  -> profile-vault sinh ra để giải quyết vấn đề đó
- Các mà dự án này giải quyết vấn đề đó: cho phép bạn tải lên tất cả các file hồ sơ các nhân của bạn ở mọi định dạng, sau đó hệ thống thông minh sẽ chọn ra một cách tự động các trường thông tin quan trọng và tổng hợp lại thành form, để bạn edit thêm/xác nhận. Sau đó sẽ xuất ra CV/porfolio website/... với nhiều mẫu template cho bạn lựa chọn.
---

# Profile Vault AI

An intelligent application designed to streamline the creation of professional CVs and portfolio websites by leveraging generative AI.

## The Problem

Creating and tailoring application materials like CVs and personal websites for different opportunities is a repetitive and time-consuming task. Job seekers often have their information scattered across various documents (PDFs, DOCX files) and need an efficient way to consolidate, structure, and present it in a polished, professional format.

Profile Vault AI solves this by automating the most tedious parts of the process, allowing users to go from raw documents to deployable assets in minutes.

## Core Functionality

-   **Automated Information Structuring**: Upload existing documents (CVs, cover letters, job descriptions), and the application will use the Google Gemini API to intelligently parse the raw text. It automatically populates a structured profile with your contact information, work history, education, and more, eliminating tedious manual data entry.

-   **Data Refinement and Editing**: A clean, user-friendly interface allows you to review, edit, and enhance the AI-generated data. You have full control to ensure complete accuracy and personalization before generating any documents.

-   **On-Demand Document Generation**:
    -   **CVs**: Instantly generate professional résumés as high-quality PDFs using a selection of modern templates.
    -   **Portfolio Websites**: Generate a complete, static, and deployable portfolio website (HTML, CSS, JS) from your profile data. Preview it live and download the source code as a ZIP archive, ready for hosting.

-   **Privacy-Focused Architecture**: File parsing and document generation are handled entirely within the user's browser. Only the extracted text content is sent to the AI for analysis, ensuring that personal files remain private.

## How It Works

The application follows a simple, four-step workflow:

1.  **Client-Side Extraction**: The user uploads documents. Services written in TypeScript (`fileExtractor.ts`) use libraries like `pdf-js` and `mammoth.js` to extract text content directly in the browser.
2.  **AI Structuring**: The extracted text is sent to a secure SvelteKit API endpoint (`/api/parse`). This backend endpoint communicates with the Google Gemini API, using a specific prompt to transform the unstructured text into a clean, predictable JSON object representing the user's profile.
3.  **User Refinement**: The structured JSON data is loaded into a global Svelte store (`profile.ts`) and rendered in an interactive editor component, where the user can make final adjustments.
4.  **Document Synthesis**:
    -   **PDF Generation**: The final profile data is passed as props to a Svelte CV template component. `html2canvas` captures the rendered component, and `jsPDF` converts this capture into a downloadable PDF.
    -   **ZIP Generation**: A static HTML template is populated with the user's data. `JSZip` then bundles the final `index.html` along with its corresponding CSS and JavaScript files into a single ZIP archive for download.

## Tech Stack

-   **Framework**: SvelteKit
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **AI Integration**: Google Gemini API
-   **Client-Side Tooling**:
    -   File Parsing: `pdf-js`, `mammoth.js`
    -   PDF Generation: `jsPDF`, `html2canvas`
    -   ZIP Generation: `JSZip`

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm (or a compatible package manager like pnpm or yarn)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/profile-vault.git
    cd profile-vault
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env` in the project root and add your Google Gemini API key.

    ```env
    # .env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
    ```

    You can obtain an API key from [Google AI Studio](https://makersuite.google.com/).

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173` to view the application.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
