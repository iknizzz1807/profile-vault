import type { MasterProfile } from "$lib/types";
import { portfolioTemplates } from "$lib/portfolio-templates";
import { createZip, downloadZip } from "./zipGenerator";

function fillTemplate(html: string, data: MasterProfile): string {
  let result = html;
  const initials = data.profileInfo.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const jobTitle = data.workExperiences[0]?.jobTitle || "Professional";

  const placeholders = {
    "{{fullName}}": data.profileInfo.fullName,
    "{{initials}}": initials,
    "{{jobTitle}}": jobTitle,
    "{{email}}": data.profileInfo.email,
    "{{phoneNumber}}": data.profileInfo.phoneNumber,
    "{{website}}": data.profileInfo.website,
    "{{summary}}": data.summary.content.replace(/\n/g, "<br>"),
  };

  for (const [key, value] of Object.entries(placeholders)) {
    result = result.replace(new RegExp(key, "g"), value || "");
  }

  // Handle work experiences with new card structure
  const workHtml = data.workExperiences
    .map(
      (exp) => `
    <div class="card">
        <h3>${exp.jobTitle}</h3>
        <p class="card-subtitle">${exp.companyName}</p>
        <p class="dates">${exp.startDate} - ${exp.endDate || "Present"}</p>
        <p>${exp.description.replace(/\n/g, "<br>")}</p>
    </div>`
    )
    .join("");
  result = result.replace("{{workExperiences}}", workHtml);

  // Handle educations with new card structure
  const eduHtml = data.educations
    .map(
      (edu) => `
		<div class="card">
			<h3>${edu.degree}</h3>
			<p class="card-subtitle">${edu.institution}</p>
			<p class="dates">${edu.startDate} - ${edu.endDate || "Present"}</p>
            <p>${edu.fieldOfStudy}</p>
		</div>
	`
    )
    .join("");
  result = result.replace("{{educations}}", eduHtml);

  return result;
}

export async function generatePortfolioZip(
  templateId: string,
  profileData: MasterProfile
) {
  const template = portfolioTemplates.find((t) => t.id === templateId);
  if (!template || !template.staticFiles) {
    throw new Error("Template not found or has no static files");
  }

  const filesToZip: { name: string; content: string }[] = [];

  const filledHtml = fillTemplate(template.staticFiles.html, profileData);
  filesToZip.push({ name: "index.html", content: filledHtml });

  if (template.staticFiles.css) {
    filesToZip.push({ name: "style.css", content: template.staticFiles.css });
  }
  if (template.staticFiles.js) {
    filesToZip.push({ name: "script.js", content: template.staticFiles.js });
  }

  const zipBlob = await createZip(filesToZip);
  await downloadZip(
    zipBlob,
    `${profileData.profileInfo.fullName}_Portfolio.zip`
  );
}
