import Submarine from "./submarine";

const listFolderContent = async (folderId: string) => {
  return await Submarine.listFolderContent(folderId);
};

export default listFolderContent;
