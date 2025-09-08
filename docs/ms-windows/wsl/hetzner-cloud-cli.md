	***
tags: #hcloud #cli #hetzner
***
# Hetzner Cloud CLI
## Prerequisites
כיגיג
- Hetzner Cloud API Token
    
    - Basic knowledge about the Hetzner Cloud
        - We assume that you know, what a server, an image, a server type or a volume is.
    - Visit Hetzner Cloud Console at [https://console.hetzner.cloud](https://console.hetzner.cloud/), select your project, and create a new API Token.
    - 
- Install ***`hcloud-cli`***  **ubuntu-24.04 distribution**
	```bash
	# Install a set of essential tools for system management and development
	sudo apt install -y nano zsh git curl jq tree zip unzip wget
	
	#========= Installing Hetzner Cloud CLI
	cd /usr/local/bin
	
	# Download Hetzner CLI
	wget https://github.com/hetznercloud/cli/releases/latest/download/hcloud-linux-amd64.tar.gz
	
	# Extract
	tar -xzf hcloud-linux-amd64.tar.gz
	
	# Move to PATH
	mv hcloud /usr/local/bin/
	
	# Make executable
	chmod +x /usr/local/bin/hcloud
	
	# Verify installation
	hcloud version
	
	# Clean up
	rm hcloud-linux-amd64.tar.gz
	```


##  Add a context
Before you can start using the hcloud-cli you need to have a context available. hcloud-cli a context is a project in the [Hetzner Cloud Console](https://console.hetzner.cloud/).

```bash
# create a hcloud-cli context
hcloud context create my-super-project
#you will be prompted to enter your API token.
#You should see a confirmation message `Context my-super-project created and activated`.


# active context when you run
hcloud context list
```

## FW Fire Wall


## Servers

### Server Type 
You can see a list of all available server types with:

```bash
hcloud server-type list
```

You should see an output similar to:

```readme
ID    NAME    CORES   CPU TYPE    ARCHITECTURE   MEMORY     DISK     STORAGE TYPE
22    cpx11   2       shared      x86            2.0 GB     40 GB    local
23    cpx21   3       shared      x86            4.0 GB     80 GB    local
24    cpx31   4       shared      x86            8.0 GB     160 GB   local
25    cpx41   8       shared      x86            16.0 GB    240 GB   local
26    cpx51   16      shared      x86            32.0 GB    360 GB   local
45    cax11   2       shared      arm            4.0 GB     40 GB    local
93    cax21   4       shared      arm            8.0 GB     80 GB    local
94    cax31   8       shared      arm            16.0 GB    160 GB   local
95    cax41   16      shared      arm            32.0 GB    320 GB   local
96    ccx13   2       dedicated   x86            8.0 GB     80 GB    local
97    ccx23   4       dedicated   x86            16.0 GB    160 GB   local
98    ccx33   8       dedicated   x86            32.0 GB    240 GB   local
99    ccx43   16      dedicated   x86            64.0 GB    360 GB   local
100   ccx53   32      dedicated   x86            128.0 GB   600 GB   local
101   ccx63   48      dedicated   x86            192.0 GB   960 GB   local
104   cx22    2       shared      x86            4.0 GB     40 GB    local
105   cx32    4       shared      x86            8.0 GB     80 GB    local
106   cx42    8       shared      x86            16.0 GB    160 GB   local
107   cx52    16      shared      x86            32.0 GB    320 GB   local
```

I see the issue now. The `describe` command requires you to specify which server type you want to describe. First, you need to list all available server types and then describe a specific one.

Try this sequence:

1. List all server types:
```
hcloud server-type list
```

2. Then choose a specific server type from the list (for example, if "cx11" is in the list) and describe it:
```
hcloud server-type describe cx11
```

3. If you want the output in JSON format:
```
hcloud server-type describe cx11 -o json
```

The error message you're getting is because the command expects a server-type name as a positional argument, and you're not providing one.

### Server Description
The `describe` command requires you to specify which server type you want 

1. List all server types:
```
hcloud server-type list
```

2. Then choose a specific server type from the list (for example, if "cx11" is in the list) and describe it:
```
hcloud server-type describe cx11
```

3. If you want the output in JSON format:
```
hcloud server-type describe cx11 -o json
```

The error message you're getting is because the command expects a server-type name as a positional argument, and you're not providing one.
