import actionResponse from "./action-response";

export default function actionSuccess(actionName: string, additionalData = {}, redirectPath = null) {
    return actionResponse(actionName, true, additionalData, redirectPath);
}
