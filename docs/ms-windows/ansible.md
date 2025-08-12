```shell
sudo apt update && sudo apt install -y python3-pip && pip install ansible community.general
```

```shell
sudo apt update && sudo apt install -y ansible
```

```shell
	# run palybook 
	ansible-playbook -i inventory/dev.ini playbooks/setup_server.yml
	
```

## After Re deploy server SSH identification changed
resulting in a `Host key verification failed` error for `142.132.167.133`. To resolve this, the existing host key needs to be removed from your `known_hosts` file, and then the Ansible playbook can be re-executed.

```shell
# run command 
ssh-keygen -f ~/.ssh/known_hosts -R '142.132.167.133'
```