import actionResponse from "./action-response";

export default function actionError(actionName: string, additionalData = {}, redirectPath = null) {
    return actionResponse(actionName, false, additionalData, redirectPath);
}
