# Ansible Core Concepts

## Inventory

The inventory is a file (or set of files) that lists and organizes your managed hosts into groups.

- **Format**: Can be written in INI or YAML format
- **Default location**: `/etc/ansible/hosts`
- **Groups**: Hosts can be organized into groups and nested groups
- **Variables**: Can define host and group variables directly in inventory or separate files

Example inventory file:
```ini
[webservers]
web1.example.com
web2.example.com ansible_host=192.168.1.101

[dbservers]
db1.example.com
db2.example.com

[datacenter:children]
webservers
dbservers
```

## Playbooks

Playbooks are YAML files that define a series of tasks to be executed on specified hosts. They're the building blocks for automation in Ansible.

- **Structure**: Composed of one or more "plays" in an ordered list
- **Plays**: Map groups of hosts to well-defined roles, tasks, and handlers
- **Idempotent**: Can be run multiple times without changing the result beyond the first time

Example playbook:
```yaml
---
- name: Install and configure web server
  hosts: webservers
  become: yes
  
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present
        
    - name: Start Apache service
      service:
        name: apache2
        state: started
        enabled: yes
```

## Tasks

Tasks are the individual units of work in Ansible playbooks.

- **Modules**: Each task calls an Ansible module (like apt, copy, service)
- **Idempotent**: Designed to be run repeatedly without side effects
- **State-based**: Focus on the desired state, not the steps to get there

## Roles

Roles provide a way to group content and share functionality in a standardized directory structure.

- **Structure**: Pre-defined directory structure containing tasks, handlers, files, templates, variables, and metadata
- **Reusability**: Easy to share and reuse across projects
- **Encapsulation**: Bundle related content into a single, logical unit

Standard role directory structure:
```
roles/
  role_name/
    tasks/      # Main list of tasks to be executed
    handlers/   # Handlers triggered by tasks
    files/      # Static files to be deployed
    templates/  # Templates (usually Jinja2) to be deployed
    vars/       # Role variables
    defaults/   # Default variables that can be overridden
    meta/       # Role metadata, including dependencies
```

## Modules

Modules are discrete units of code that can be used from the command line or in playbooks.

- **Types**: System, commands, files, database, cloud, etc.
- **Return Values**: Return JSON data about success, failure, and changes
- **Idempotent**: Most modules are designed to be idempotent

Common modules:
- `apt/yum`: Package management
- `copy/template`: File management
- `service`: Service management
- `user`: User management

## Variables

Variables store values that can be used throughout playbooks and templates.

- **Scope**: Global, play, host, or task level
- **Precedence**: Well-defined order of precedence for variable resolution
- **Sources**: Command line, playbooks, inventory, vars files, roles, etc.

## Templates

Templates use the Jinja2 templating engine to create dynamic content.

- **Format**: Plain text with variables and control structures
- **Purpose**: Generate configuration files dynamically based on variables
- **Extension**: Usually `.j2` to indicate Jinja2 templates

Example template:
```jinja
# Apache VirtualHost Configuration
<VirtualHost *:{{ http_port }}>
    ServerAdmin {{ admin_email }}
    DocumentRoot {{ document_root }}
    ServerName {{ server_name }}
</VirtualHost>
```

## Handlers

Handlers are tasks that only run when notified by another task.

- **Purpose**: Used for actions that should only happen once, like service restarts
- **Notification**: Tasks use the `notify` directive to trigger handlers
- **Execution**: Handlers run at the end of each play if notified

Example:
```yaml
tasks:
  - name: Update Apache configuration
    template:
      src: apache.conf.j2
      dest: /etc/apache2/apache.conf
    notify: Restart Apache

handlers:
  - name: Restart Apache
    service:
      name: apache2
      state: restarted
```

## Facts

Facts are system properties discovered by Ansible when it connects to a host.

- **Gathering**: Automatically collected during playbook execution
- **Usage**: Accessible as variables in playbooks and templates
- **Custom Facts**: Can be created to extend the built-in facts

## Ad-hoc Commands

Ad-hoc commands are one-liners used for quick tasks rather than stored in playbooks.

Example:
```bash
ansible webservers -m ping
ansible all -m apt -a "name=nginx state=present" -b
```

## Vault

Ansible Vault encrypts sensitive data like passwords and keys.

- **Security**: AES256 encryption for sensitive variables
- **Usage**: Encrypt entire files or just specific variables
- **Integration**: Seamlessly used in playbooks and roles

## Collections

Collections are a distribution format for Ansible content including modules, roles, plugins, and documentation.

- **Structure**: Defined format that can be shared via Ansible Galaxy
- **Namespacing**: Uses namespaces to avoid conflicts (e.g., `namespace.collection_name`)
- **Distribution**: Can be installed via `ansible-galaxy`

## Execution Strategy

Defines how Ansible traverses hosts when executing tasks.

- **Linear**: Default strategy, runs each task on all hosts before starting the next task
- **Free**: Allows each host to run through tasks as fast as possible
- **Serial**: Execute tasks in batches of hosts
- **Custom**: Define your own execution patterns

This overview covers the fundamental concepts that form the backbone of Ansible automation. Each concept works together to create a powerful, flexible system for infrastructure management and application deployment.