const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, TextControl, PanelBody } = wp.components;
const { createElement } = wp.element;

registerBlockType('custom-blocks/profile-about', {
    title: 'Profile About',
    icon: 'cover-image',
    category: 'custom-blocks',

    attributes: {
        title: { type: 'string', source: 'html', selector: 'h2' },
        image: { type:'string', default: '' },
        content: { type: 'string', source: 'html', selector: 'p' },
        interests: { type: 'array', default: [], items: { type: 'object', properties: { icon: { type: 'string' }, title: { type: 'string' }, content: { type: 'string' } } } }
    }, 

    edit({ attributes, setAttributes }) {
        const { title, content, image, interests } = attributes;

        const addInterest = () => {
            setAttributes({ interests: [...interests, { icon: '', title: '', content: '' }] });
        };

        const updateInterest = (index, key, value) => {
            const newInterests = [...interests];
            newInterests[index][key] = value;
            setAttributes({ interests: newInterests });
        };

        const removeInterest = (index) => {
            setAttributes({ interests: interests.filter((_, i) => i !== index) });
        };

        return createElement('div', { className: 'profile-about-editor' },
            // Sidebar Panel
            createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'About Section Settings', initialOpen: true },
                    createElement(MediaUpload, {
                    onSelect: (media) => setAttributes({ image: media.url }),
                    allowedTypes: ['image'],
                    value: image,
                    render: ({ open }) => createElement(Button, {
                        onClick: open,
                        isPrimary: !image,
                        isLink: !!image
                    }, image ? 'Change Image' : 'Upload Image')
                }),
                    createElement(RichText, {
                        tagName: 'h2',
                        label: 'About Title',
                        value: title,
                        placeholder: 'Enter About Title',
                        onChange: (value) => setAttributes({ title: value })
                    }),
                    createElement(RichText, {
                        tagName: 'p',
                        label: 'About Content',
                        value: content,
                        placeholder: 'Enter About Content',
                        onChange: (value) => setAttributes({ content: value })
                    })
                ),
                createElement('div', { style: { marginTop: '1em' } },
                    interests.map((interest, index) =>
                        createElement('div', { key: index, style: { marginBottom: '1em' } },
                            interest.icon && createElement('img', {
                                src: interest.icon,
                                alt: interest.title || '',
                                style: { width: 32, height: 32, marginRight: 8 }
                            }),
                            createElement(MediaUpload, {
                                onSelect: (media) => updateInterest(index, 'icon', media.url),
                                allowedTypes: ['image'],
                                render: ({ open }) =>
                                    createElement(Button, { onClick: open, isLink: true },
                                        interest.icon ? 'Change Icon' : 'Upload Icon'
                                    )
                            }),
                            createElement(TextControl, {
                                label: 'Interest Title',
                                value: interest.title,
                                onChange: (title) => updateInterest(index, 'title', title)
                            }),
                            createElement(TextControl, {
                                label: 'Interest Content',
                                value: interest.content,
                                onChange: (content) => updateInterest(index, 'content', content)
                            }),
                            createElement(Button, {
                                isDestructive: true,
                                onClick: () => removeInterest(index)
                            }, 'Remove')
                        )
                    ),
                    createElement(Button, { isPrimary: true, onClick: addInterest }, 'Add Interest')
                )
            ),
            //Editor Canvas
            createElement('div', { className: 'profile-about-preview' },
                image && createElement('img', { src: image, alt: 'About Image' }),
                createElement('h2', null, title || 'About Title'),
                createElement('p', null, content || 'About Content')
            )
        );
    },

    save({ attributes }) {
        const { title, content, image, interests } = attributes;
        return createElement('section', { className: 'profile-about bg-dark' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'row' },
                    createElement('div', { className: 'col-12 text-center' },
                        createElement(RichText.Content, { tagName: 'h2', value: title, className: 'h2' }),
                    ),
                    createElement('div', { className: 'col-md-6' },
                        image && createElement('img', { src: image, alt: 'About Image' }),
                    ),
                    createElement('div', { className: 'col-md-6 d-flex align-items-center' },
                        createElement(RichText.Content, { tagName: 'p', value: content })
                    ),
                ),
                createElement('div', { className: 'row pt-5' }, 
                    interests.map((interest, index) =>
                        createElement('div', { key: index, className: 'col-md-4 mb-4 d-flex' },
                            createElement('div', { className: 'interest-item text-center card' },
                                createElement('div', { className: 'card-icon-wrapper mb-4' },
                                    interest.icon && createElement('img', { src: interest.icon, alt: interest.title || '', className: 'card-icon' }),
                                ),
                                createElement('h3', null, interest.title || ''),
                                createElement('p', null, interest.content || '')
                            )
                        )
                    )
                ),
            ),
        );
    }
});



