registerBlockType('custom-blocks/profile-hero', {
    title: 'Profile Hero',
    icon: 'cover-image',
    category: 'custom-blocks',

    attributes: {
        headshot: { type:'string', default: '' },
        title: { type: 'string', source: 'html', selector: 'h1' },
        subtitle: { type: 'string', source: 'html', selector: 'h2' },
        content: { type: 'string', source: 'html', selector: 'p' },
        socials: { type: 'array', default: [] }
    },

    edit({ attributes, setAttributes }) {
        const { title, subtitle, content, socials, headshot} = attributes;
            // Add a new social item
        const addSocial = () => {
            setAttributes({ socials: [...socials, { image: '', url: '', alt: '' }] });
        };

        // Update an item
        const updateSocial = (index, key, value) => {
            const newSocials = [...socials];
            newSocials[index][key] = value;
            setAttributes({ socials: newSocials });
        };

        // Remove an item
        const removeSocial = (index) => {
            setAttributes({ socials: socials.filter((_, i) => i !== index) });
        };

        return createElement('div', { className: 'profile-hero-editor' },
            // Sidebar Panel
            createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'Hero Settings', initialOpen: true },
                    createElement(MediaUpload, {
                    onSelect: (media) => setAttributes({ headshot: media.url }),
                    allowedTypes: ['image'],
                    value: headshot,
                    render: ({ open }) => createElement(Button, {
                        onClick: open,
                        isPrimary: !headshot,
                        isLink: !!headshot
                    }, headshot ? 'Change Headshot' : 'Upload Headshot')
                }),
                    createElement(RichText, {
                        tagName: 'h1',
                        label: 'Hero Title',
                        value: title,
                        placeholder: 'Enter Hero Title',
                        onChange: (value) => setAttributes({ title: value })
                    }),
                    createElement(RichText, {
                        tagName: 'h2',
                        label: 'Hero Subtitle',
                        value: subtitle,
                        placeholder: 'Enter Hero Subtitle',
                        onChange: (value) => setAttributes({ subtitle: value })
                    }),
                    createElement('div', { style: { marginTop: '1em' } },
                        socials.map((social, index) =>
                            createElement('div', { key: index, style: { marginBottom: '1em' } },
                                social.image && createElement('img', {
                                    src: social.image,
                                    alt: social.alt || '',
                                    style: { width: 32, height: 32, marginRight: 8 }
                                }),
                                createElement(MediaUpload, {
                                    onSelect: (media) => updateSocial(index, 'image', media.url),
                                    allowedTypes: ['image'],
                                    render: ({ open }) =>
                                        createElement(Button, { onClick: open, isLink: true },
                                            social.image ? 'Change Icon' : 'Upload Icon'
                                        )
                                }),
                                createElement(TextControl, {
                                    label: 'Link URL',
                                    value: social.url,
                                    onChange: (url) => updateSocial(index, 'url', url)
                                }),
                                createElement(Button, {
                                    isDestructive: true,
                                    onClick: () => removeSocial(index)
                                }, 'Remove')
                            )
                        ),
                        createElement(Button, { isPrimary: true, onClick: addSocial }, 'Add Social Icon')
                    )
                )
            ),
            //Editor Canvas
            headshot && createElement('img', {
                src: attributes.headshot,
                alt: 'Headshot',
                className: 'profile-hero-headshot',
                style: { width: 150, height: 150, borderRadius: '50%', marginBottom: '1em' }
            }),
            createElement(RichText, {
                tagName: 'h1',
                value: title,
                placeholder: 'Hero Title',
                onChange: (title) => setAttributes({ title })
            }),
            createElement(RichText, {
                tagName: 'h2',
                value: subtitle,
                placeholder: 'Hero Subtitle',
                onChange: (subtitle) => setAttributes({ subtitle })
            }),
            createElement(RichText, {
                tagName: 'p',
                value: content,
                placeholder: 'Hero Content',
                onChange: (content) => setAttributes({ content })
            }),
            createElement('div', { className: 'profile-hero-preview', style: { marginTop: 20, display: 'flex', gap: '10px' } },
                socials.map((social, index) =>
                    social.image && createElement('a', { href: social.url || '#', key: index, target: '_blank', rel: 'noopener noreferrer' },
                        createElement('img', { src: social.image, alt: social.alt || '', style: { width: 32, height: 32 } })
                    )
                )
            )
        );
    },

    save({ attributes }) {
        return createElement('section', { className: 'profile-hero bg-light d-flex flex-column justify-content-center' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'row d-flex justify-content-center' },
                    createElement('div', { className: 'col-lg-8 col-md-10 text-center text-center fade-in' },
                        attributes.headshot && createElement('img', { src: attributes.headshot, alt: 'Headshot', className: 'profile-hero-headshot'}),
                        createElement(RichText.Content,{tagName: 'h1',  value: attributes.title}),
                        createElement('h2', { className: 'h3' }, attributes.subtitle),
                        createElement('p', null, attributes.content)
                    ),
                    createElement('div', { className: 'col-md-12 d-flex justify-content-center' },
                        createElement('div', { className: 'social-icons d-flex gap-3' },
                            attributes.socials.map((social, index) => createElement('a', {
                                href: social.url,
                                key: index,
                                target: '_blank',
                                rel: 'noopener noreferrer',
                                alt: social.alt,
                                className: 'social-link bounce-up-hover'
                            }, createElement('img', { src: social.image, alt: social.alt, className: 'social-icon' })))
                        )
                    )
                ),
            ),
        );
    }
});