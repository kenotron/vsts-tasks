import * as path from 'path';
import * as task from 'vsts-task-lib/task';
import { pythonScript } from './pythonscript';

(async () => {
    try {
        task.setResourcePath(path.join(__dirname, 'task.json'));
        await pythonScript({
            scriptSource: task.getInput('scriptSource'),
            scriptPath: task.getPathInput('scriptPath'),
            script: task.getInput('script'),
            arguments: task.getInput('arguments'),
            pythonInterpreter: task.getInput('pythonInterpreter'), // string instead of path: a path will default to the agent's sources directory
            workingDirectory: task.getPathInput('workingDirectory'),
            failOnStderr: task.getBoolInput('failOnStderr')
        });
        task.setResult(task.TaskResult.Succeeded, "");
    } catch (error) {
        task.error(error.message);
        task.setResult(task.TaskResult.Failed, error.message);
    }
})();
