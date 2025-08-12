# Ollama Container Interaction

## Table of Contents

1. [Introduction](#Introduction)
2. [Accessing the Container Shell](#Accessing%20the%20Container%20Shell)
3. [Listing Local Models](#Listing%20Local%20Models)
4. [[#Browsing & Downloading Official Models]]
5. [Updating Ollama and Models](#Updating%20Ollama%20and%20Models)
6. [Running and Interacting with Models](#Running%20and%20Interacting%20with%20Models)
7. [Tweaking and Extending Models](#Tweaking%20and%20Extending%20Models)
8. [Training Fine-tuning Models](#Training%20Fine-tuning%20Models)
9. [Extending with Custom Models](#Extending%20with%20Custom%20Models)
10. [Useful Resources](#Useful%20Resources)

---

## Introduction

You have the `ollama-api` container running from the official `ollama/ollama` image. This acts as a self-hosted LLM (Large Language Model) server. All model management and interaction operations can be executed from within the container. This guide will cover essential and advanced operations using CLI and API.

## Accessing the Container Shell

To run commands inside the container, use the following Docker exec command:

```sh
docker exec -it ollama-api-psswwcsw8sk8ws8s844os08o zsh
or
docker_exec_ollama
```

> If bash is unavailable, use `sh`.

---

## System Update and Package Installation

### Update Package Repositories and Upgrade Existing Packages

**Action:** Update package repositories and upgrade existing packages to ensure you have the latest versions

```bash
sudo apt update && sudo apt upgrade -y
```

**Action:** Install Packages

```bash
apt install zsh curl git nano


# install zshrc
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
source ~/.zshrc


# open config file
nano ~/.zshrc
## set the theme
ZSH_THEME="mikeh" #set theme

## set custom command line
plugins=(git)
CONTAINER_NAME="ollama-api"
source $ZSH/oh-my-zsh.sh                                                                PROMPT='%F{green}[%n@%m%f - (%F{yellow}$CONTAINER_NAME%f)] - %F{blue}[%~]%f - [%D{%a %b %d, %H:%M}]                                                                             %F{cyan}[%#] <()>%f '

# do not change
source $ZSH/oh-my-zsh.sh
```

## Listing Local Models

Once inside the container, list all downloaded models with:

```sh
ollama list
```

This gives output like:

```
MODEL           SIZE            MODIFIED
llama2          3.8G            2024-06-01
mistral         4.2G            2024-05-21
```

---

## Browsing & Downloading Official Models

Check [Ollama's Model Library](https://ollama.com/library) or search for models from within the container:

**To pull (download) a model:**

```sh

ollama pull <model-name>



```

For example:

```sh
ollama pull llama2
ollama pull mistral
ollama pull orca-mini
ollama pull smollm2:1.7b
```

---

## Updating Ollama & Models

**Update to the latest version:**

- Ensure Docker is running the latest `ollama/ollama:latest` by pulling and restarting the container:
  ```sh
  docker pull ollama/ollama:latest
  # Then restart your stack / container (e.g., docker-compose up -d)
  ```
- Update a specific model:
  ```sh
  ollama pull <model-name>
  ```

---

## Running and Interacting with Models

You can interact with models either via **CLI** (in the container shell) or **REST API**.

### Using the CLI:

Start an interactive chat:

```sh
ollama run llama2
```

You can type prompts directly after starting.

### Using the REST API:

Send prompts with cURL:

```sh
curl http://localhost:11434/api/generate \
     -d '{
           "model": "smollm2:360m",
           "prompt": "What is the capital of France?"
         }'


```

**API is accessible from outside the container**, using the mapped port (default: 11434, e.g. `http://<your_docker_host>:11434`).

---

## Tweaking and Extending Models

- **Prompt Tweaking:** You can adjust system/context prompts via the API. Example:

  ```sh
  curl http://localhost:11434/api/generate \
       -d '{
            "model": "llama2",
            "prompt": "Summarize the following text...",
            "options": {
               "temperature": 0.7,
               "max_tokens": 256
            }
      }'
  ```

- **Exporting Custom Models:** [Ollama Model Files](https://ollama.com/library) can be exported, shared, or customized with your datasets.

---

## Training (Fine-tuning) Models

As of early 2024, direct model fine-tuning with new datasets is experimental or limited with Ollama. Check the latest [Ollama docs](https://ollama.com/docs/) for updates.

**General steps (when available):**

1. Prepare your dataset in supported format (often JSON or txt pairs).
2. Use the CLI or API to invoke training if supported:
   ```sh
   ollama train <base-model> --data path/to/data.jsonl --output my-finetuned-model
   ```
3. List and run your custom model as usual.

**Note:** For complex fine-tuning, consider exporting model weights and using frameworks like HuggingFace Transformers, then re-importing.

---

## Extending with Custom Models

- **Add Local Models:** Place compatible model files in `volumes/ollama` or import using `ollama import`.
- **Custom Models from HuggingFace:** Not all HuggingFace models are supported by default. Check [Ollama Model Creation](https://ollama.com/docs/model-files/) to convert supported formats.
- **Editing `Modelfile`:** You can define custom prompts/settings in a `Modelfile` (similar to a Dockerfile for models).

---

## Useful Resources

- [Ollama Documentation](https://ollama.com/docs/)
- [Ollama Model Library](https://ollama.com/library)
- [Ollama Github](https://github.com/jmorganca/ollama)

---

# Common Commands Summary

| Operation                     | Command/URL Example                                                              |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Shell access                  | `docker exec -it ollama-api-<ID> bash`                                           |
| List models                   | `ollama list`                                                                    |
| Download model                | `ollama pull <model-name>`                                                       |
| Remove model                  | `ollama rm <model-name>`                                                         |
| Run model interactively (CLI) | `ollama run <model-name>`                                                        |
| Query model (API)             | `curl http://localhost:11434/api/generate -d '{"model":"llama2","prompt":"Hi"}'` |
| Show help                     | `ollama --help`                                                                  |

> [!failure]- Failure
> Error: There is another generation process

> [!failure]- Failure
> Error: AbortError
>
> - plugin:obsidian-textgenerator-plugin:421 yu.\_streamResponseChunks
>   plugin:obsidian-textgenerator-plugin:421:14242
>
> - plugin:obsidian-textgenerator-plugin:421 async yu.\_generate
>   plugin:obsidian-textgenerator-plugin:421:14469
>
> - async Promise.allSettled
>
> - plugin:obsidian-textgenerator-plugin:121 async yu.\_generateUncached
>   plugin:obsidian-textgenerator-plugin:121:10431
>
> - plugin:obsidian-textgenerator-plugin:121 async yu.invoke
>   plugin:obsidian-textgenerator-plugin:121:7701
>
> - plugin:obsidian-textgenerator-plugin:2055 async eval
>   plugin:obsidian-textgenerator-plugin:2055:4296

---
