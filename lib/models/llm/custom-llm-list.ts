import { LLM } from "@/types"

const GoogleDrive: LLM = {
  modelId: "Google Drive Model",
  modelName: "Google Drive Model",
  provider: "custom",
  hostedId: "Google Drive Model",
  platformLink: "https://google.com",
  imageInput: false
}

export const CUSTOM_LLM_LIST: LLM[] = [GoogleDrive]
