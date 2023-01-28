import sub from "./sub";

const listFolderContent = async (folderId: string) => {
  return await sub.listFolderContent(folderId);
};

export default listFolderContent;
