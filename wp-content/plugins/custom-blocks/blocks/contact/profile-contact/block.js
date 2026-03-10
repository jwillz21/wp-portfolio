registerBlockType('custom-blocks/profile-contact', {
    title: 'Profile Contact Information',
    icon: 'cover-image',
    category: 'custom-blocks',
    supports: { anchor: true },
    attributes: {
        title: { type: 'string', source: 'html', selector: 'h2' },
        content: { type: 'string', source: 'html', selector: 'p' },
        contacts: { type: 'array', default: [], items: { type: 'object', properties: { icon: { type: 'string' }, title: { type: 'string' }, method: { type: 'string' }, url: { type: 'string' }}}},
        socials: { type: 'array', default: [], items: { type: 'object', properties: { icon: { type: 'string' }, url: { type: 'string' }, alt: { type: 'string' }}}}
    }, 

    edit({ attributes, setAttributes }) {
        const { title, content, contacts, socials } = attributes;

        const addContact = () => {
            setAttributes({ contacts: [...contacts, { icon: '', title: '', method: '', category: '', url: '' }] });
        };

        const addSocial = () => {
            setAttributes({ socials: [...socials, { icon: '', url: '', alt: '' }] });
        };

        const updateContact = (index, key, value) => {
            const newContacts = [...contacts];
            newContacts[index][key] = value;
            setAttributes({ contacts: newContacts });
        };

        const updateSocial = (index, key, value) => {
            const newSocials = [...socials];
            newSocials[index][key] = value;
            setAttributes({ socials: newSocials });
        };

        const removeContact = (index) => {
            setAttributes({ contacts: contacts.filter((_, i) => i !== index) });
        };

        const removeSocial = (index) => {
            setAttributes({ socials: socials.filter((_, i) => i !== index) });
        };

        return createElement('div', { className: 'profile-contact-editor' },
            // Sidebar Panel
            createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'Contact Section Settings', initialOpen: true },
                    createElement(RichText, {
                        tagName: 'h2',
                        label: 'Contact Title',
                        value: title,
                        placeholder: 'Enter Contact Title',
                        onChange: (value) => setAttributes({ title: value })
                    }),
                    createElement(RichText, {
                        tagName: 'p',
                        label: 'Contact Content',
                        value: content,
                        placeholder: 'Enter Contact Content',
                        onChange: (value) => setAttributes({ content: value })
                    }),
                    createElement('div', { className: 'contact-options' },
                        contacts.map((contact, index) =>
                            createElement('div', { key: index, className: 'contact-item' },
                                createElement(MediaUpload, {
                                    onSelect: (media) => updateContact(index, 'icon', media.url),
                                    allowedTypes: ['image'],
                                    render: ({ open }) =>
                                        createElement(Button, { onClick: open, isLink: true },
                                            contact.icon ? 'Change Icon' : 'Upload Icon'
                                        )
                                }),
                                createElement(TextControl, {
                                    label: 'Title',
                                    value: contact.title,
                                    onChange: (title) => updateContact(index, 'title', title)
                                }),
                                createElement(SelectControl, {
                                    label: 'Contact Method',
                                    value: contact.method,
                                    options: [
                                        { label: 'Select a method', value: '' },
                                        { label: 'Email', value: 'email' },
                                        { label: 'Phone', value: 'phone' },
                                        { label: 'Location', value: 'location' },
                                    ],
                                    onChange: (method) => updateContact(index, 'method', method)
                                }),
                                createElement(TextControl, {
                                    label: 'Link URL',
                                    value: contact.url,
                                    onChange: (url) => updateContact(index, 'url', url)
                                }),
                                createElement(Button, {
                                    onClick: () => removeContact(index),
                                    isDestructive: true,
                                    style: { marginTop: '5px' }
                                }, 'Remove Contact')
                            )
                        ),
                        createElement(Button, {
                            onClick: addContact,
                            isPrimary: true,
                            style: { marginTop: '10px' }
                        }, 'Add Contact')
                    ),
                    createElement('div', { className: 'socials-list', style: { marginTop: '20px' } },
                        socials.map((social, index) =>
                            createElement('div', { key: index, className: 'social-item' },
                                createElement(MediaUpload, {
                                    onSelect: (media) => updateSocial(index, 'icon', media.url),
                                    allowedTypes: ['image'],
                                    render: ({ open }) =>
                                        createElement(Button, { onClick: open, isLink: true },
                                            social.icon ? 'Change Icon' : 'Upload Icon'
                                        )
                                }),
                                createElement(TextControl, {
                                    label: 'Link URL',
                                    value: social.url,
                                    onChange: (url) => updateSocial(index, 'url', url)
                                }),
                                createElement(Button, {
                                    onClick: () => removeSocial(index),
                                    isDestructive: true,
                                    style: { marginTop: '5px' }
                                }, 'Remove Social')
                            )
                        ),
                        createElement(Button, {
                            onClick: addSocial,
                            isPrimary: true,
                            style: { marginTop: '10px' }
                        }, 'Add Social')
                    )
                ),
            ),
            //Editor Canvas
            createElement('div', { className: 'profile-contact-preview' },
                createElement('h2', null, title || 'Contact Title'),
                createElement('p', null, content || 'Contact Content'),
                createElement('div', { className: 'contacts-list' },
                    contacts.map((contact, index) =>
                        // replace with contact card
                        createElement('div', { key: index, className: 'contact-item' },
                            contact.icon && createElement('img', { src: contact.icon })
                        )
                    ),
                    socials.map((social, index) =>
                        // replace with socials icons
                        createElement('div', { key: index, className: 'technology-item' },
                            social.icon && createElement('img', { src: social.icon })
                        )
                    )
                )
            )
        );
    },

    save({ attributes }) {
        const { title, content, contacts, socials } = attributes;
        return createElement('section', { className: 'profile-contact bg-light' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'row' },
                    createElement('div', { className: 'col-12 text-center' },
                        createElement(RichText.Content, { tagName: 'h2', value: title, className: 'h2' }),
                        createElement(RichText.Content, { tagName: 'p', value: content })
                    ),
                ),
                createElement('div', { className: 'row py-5 align-items-stretch justify-content-center' },
                    contacts.map((contact, index) =>
                        createElement('div', { key: index, className: 'col-md-3 mb-4 mb-md-0' },
                            createElement('div', { className: 'contacts card card-dark h-100' },
                                createElement('div', { className: 'card-body d-flex flex-column' },
                                    contact.method !== 'location'
                                        ? createElement('a', { 
                                            className: 'contact-link stretched-link d-flex flex-column text-center',
                                            href: contact.method === 'email' ? `mailto:${contact.url}` : contact.method=== 'phone' ? `tel:${contact.url}` : '',
                                            target: '_blank',
                                            rel: 'noopener noreferrer'
                                        },
                                        contact.icon && createElement('div', {className: 'card-icon-wrapper mb-4'},
                                            createElement('img', { src: contact.icon, alt: contact.title || '', className: 'card-icon' }),
                                        ),
                                        createElement('span', { className: 'contact-category' }, contact.method),
                                        createElement('h4', null, contact.title || '')
                                        )
                                        : 
                                        createElement('div', {className: 'contact-link stretched-link d-flex flex-column text-center'},
                                            createElement('div', {className: 'card-icon-wrapper mb-4'},
                                                contact.icon && createElement('img', { src: contact.icon, alt: contact.title || '', className: 'card-icon' }),
                                            ),
                                            createElement('span', { className: 'contact-category' }, contact.method),
                                            createElement('h4', null, contact.title || '')
                                        )
                                        
                                )
                            )
                        )
                    )
                ),
                createElement('div', { className: 'row' },
                    createElement('div', { className: 'col-12 text-center' },
                        createElement(RichText.Content, { tagName: 'h3', value: 'Connect With Me', className: 'h3' }),
                    ),
                ),
                createElement('div', { className: 'row' },
                    createElement('div', { className: 'col-12 justify-content-center d-flex gap-2' },
                        socials.map((social, index) => createElement('a', {
                                href: social.url,
                                key: index,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                alt: social.alt,
                                className: 'social-link bounce-up-hover'
                            }, createElement('img', { src: social.icon, alt: social.alt, className: 'social-icon' }))
                        )
                    ),
                ),
            ),
            
        );
    }
});



