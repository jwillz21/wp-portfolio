registerBlockType('custom-blocks/profile-skills', {
    title: 'Profile Skills & Technologies',
    icon: 'cover-image',
    category: 'custom-blocks',

    attributes: {
        title: { type: 'string', source: 'html', selector: 'h2' },
        content: { type: 'string', source: 'html', selector: 'p' },
        skills: { type: 'array', default: [], items: { type: 'object', properties: { title: { type: 'string' }}}},
        technologies: { type: 'array', default: [], items: { type: 'object', properties: { title: { type: 'string' }}}} 
    }, 

    edit({ attributes, setAttributes }) {
        const { title, content, skills, technologies } = attributes;

        const addSkill = () => {
            setAttributes({ skills: [...skills, { title: '' }] });
        };

        const addTechnology = () => {
            setAttributes({ technologies: [...technologies, { title: '' }] });
        };

        const updateSkill = (index, key, value) => {
            const newSkills = [...skills];
            newSkills[index][key] = value;
            setAttributes({ skills: newSkills });
        };

        const updateTechnology = (index, key, value) => {
            const newTechnologies = [...technologies];
            newTechnologies[index][key] = value;
            setAttributes({ technologies: newTechnologies });
        };

        const removeSkill = (index) => {
            setAttributes({ skills: skills.filter((_, i) => i !== index) });
        };

        const removeTechnology = (index) => {
            setAttributes({ technologies: technologies.filter((_, i) => i !== index) });
        };

        return createElement('div', { className: 'profile-skills-editor' },
            // Sidebar Panel
            createElement(InspectorControls, null,
                createElement(PanelBody, { title: 'Skills Section Settings', initialOpen: true },
                    createElement(RichText, {
                        tagName: 'h2',
                        label: 'Skills Title',
                        value: title,
                        placeholder: 'Enter Skills Title',
                        onChange: (value) => setAttributes({ title: value })
                    }),
                    createElement(RichText, {
                        tagName: 'p',
                        label: 'Skills Content',
                        value: content,
                        placeholder: 'Enter Skills Content',
                        onChange: (value) => setAttributes({ content: value })
                    }),
                    createElement('div', { className: 'skills-list' },
                        skills.map((skill, index) =>
                            createElement('div', { key: index, className: 'skill-item' },
                                createElement(RichText, {
                                    tagName: 'p',
                                    label: `Skill ${index + 1}`,
                                    value: skill.title,
                                    placeholder: `Enter Skill ${index + 1}`,
                                    onChange: (value) => updateSkill(index, 'title', value)
                                }),
                                createElement(Button, {
                                    onClick: () => removeSkill(index),
                                    isDestructive: true,
                                    style: { marginTop: '5px' }
                                }, 'Remove Skill')
                            )
                        ),
                        createElement(Button, {
                            onClick: addSkill,
                            isPrimary: true,
                            style: { marginTop: '10px' }
                        }, 'Add Skill')
                    ),
                    createElement('div', { className: 'technologies-list', style: { marginTop: '20px' } },
                        technologies.map((tech, index) =>
                            createElement('div', { key: index, className: 'technology-item' },
                                createElement(RichText, {
                                    tagName: 'p',
                                    label: `Technology ${index + 1}`,
                                    value: tech.title,
                                    placeholder: `Enter Technology ${index + 1}`,
                                    onChange: (value) => updateTechnology(index, 'title', value)
                                }),
                                createElement(Button, {
                                    onClick: () => removeTechnology(index),
                                    isDestructive: true,
                                    style: { marginTop: '5px' }
                                }, 'Remove Technology')
                            )
                        ),
                        createElement(Button, {
                            onClick: addTechnology,
                            isPrimary: true,
                            style: { marginTop: '10px' }
                        }, 'Add Technology')
                    )
                ),
            ),
            //Editor Canvas
            createElement('div', { className: 'profile-skills-preview' },
                createElement('h2', null, title || 'Skills Title'),
                createElement('p', null, content || 'Skills Content'),
                createElement('div', { className: 'skills-list' },
                    skills.map((skill, index) =>
                        createElement('div', { key: index, className: 'skill-item' },
                            createElement('p', null, skill.title || '')
                        )
                    ),
                    technologies.map((tech, index) =>
                        createElement('div', { key: index, className: 'technology-item' },
                            createElement('p', null, tech.title || '')
                        )
                    )
                )
            )
        );
    },

    save({ attributes }) {
        const { title, content, skills, technologies } = attributes;
        return createElement('section', { className: 'profile-skills bg-light' },
            createElement('div', { className: 'container' },
                createElement('div', { className: 'row' },
                    createElement('div', { className: 'col-12 text-center' },
                        createElement(RichText.Content, { tagName: 'h2', value: title, className: 'h2' }),
                        createElement(RichText.Content, { tagName: 'p', value: content })
                    ),
                ),
                createElement('div', { className: 'row pt-5 align-items-stretch justify-content-center' }, 
                    createElement('div', { className: 'col-md-5' },
                        createElement('div', { className: 'skills card card-dark h-100' },
                            createElement('div', { className: 'card-body d-flex flex-column' },
                                createElement('h3', { className: 'h3' }, 'Frameworks & Languages'),
                                createElement('div', { className: 'd-flex flex-wrap gap-2 mt-3' },
                                    skills.map((skill, index) =>
                                        createElement('span', { key: index, className: 'pill' }, skill.title)
                                    )
                                )
                            )
                        )
                    ),
                    createElement('div', { className: 'col-md-5' },
                        createElement('div', { className: 'technologies card card-dark h-100' },
                            createElement('div', { className: 'card-body d-flex flex-column' },
                                createElement('h3', { className: 'h3' }, 'Tools & Platforms'),
                                createElement('div', { className: 'd-flex flex-wrap gap-2 mt-3' },
                                    technologies.map((tech, index) =>
                                        createElement('span', { key: index, className: 'pill' }, tech.title)
                                    )
                                )
                            )
                        )
                    ),
                ),
            ),
        );
    }
});



