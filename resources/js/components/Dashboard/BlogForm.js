import React, { useState, useEffect, useRef } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import CreatableSelect from 'react-select/creatable';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-day-picker/lib/style.css';

import blogService from '../../services/blog.service'

const BlogForm = (props) => {
  const id = props.match.params.id
  let quill = useRef(null)
  let nameRef = useRef(null)
  const [toHome, setToHome] = useState(false)

  const [contenu, setContenu] = useState('')
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCats, setSelectedCats] = useState([])
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    blogService.getTags().then(
      res => setTags(res)
    )
    blogService.getCategories().then(
      res => setCategories(res)
    )
  }, [])
  useEffect(() => {
    if (id) {
      setLoading(true)
      blogService.getById(id)
        .then(res => {
          console.log('Hello', res)
          setContenu(res.content)
          setSelectedTags(res.tags.map(t => {
            return {
              value: t.id,
              label: t.nom
            }
          }))
          setSelectedCats(res.categories.map(c => {
            return {
              value: c.id,
              label: c.nom
            }
          }))
          setName(res.title)
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }

  }, [])
  const slugTitle = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    let from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    let to = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  const toLabelAndValue = (val) => {
    return {
      value: val.id,
      label: val.nom
    }
  }
  const handleTagsChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      let tmp = Array.from(newValue)
      blogService.saveTag(tmp.pop().label).then(res => {
        const x = toLabelAndValue(res.new)
        setSelectedTags([...Array.from(selectedTags), x])
      })
    } else {
      setSelectedTags([...Array.from(newValue || [])])
    }
  };
  const handleCategoryChange = (newValue, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      let tmp = Array.from(newValue)
      blogService.saveCategory(tmp.pop().label).then(res => {
        console.log('RES!!!', res)
        const x = toLabelAndValue(res.new)
        setSelectedCats([...Array.from(selectedCats), {}])
      }).catch(err => console.log(err))
    } else {
      setSelectedCats([...Array.from(newValue || [])])
    }
  };
  const submit = () => {
    setLoading(true)
    console.log(selectedTags)
    setErrors({})
    let tmpErr = {}
    console.log(nameRef.value)
    if (!nameRef.value) {
      tmpErr.name = true
    }
    if (quill.current.getEditorContents() === '' || quill.current.getEditorContents() === '<p><br><p>') {
      tmpErr.content = true
    }
    if (!selectedCats.length) {
      tmpErr.cats = true
    }
    if(!selectedTags.length) {
      tmpErr.tags = true
    }
    setErrors(tmpErr)
    if (Object.keys(tmpErr).length > 0) {
      setLoading(false)
      return
    }

    let newPost = {
      title: nameRef.value,
      tags: selectedTags.map(t => t.value),
      categories: selectedCats.map(t => t.value),
      permalink: slugTitle(nameRef.value),
      content: quill.current.getEditorContents()
    }
    if (id) {
      newPost.id = id
      blogService.update(newPost).then(res => setToHome(true))
        .catch(err => console.log(err))
      return
    }

    blogService.save(newPost).then(res => setToHome(true))
      .catch(err => console.log(err))
  }

  const imageHandler = () => {
    const input = document.createElement('input');
    // console.log(quill.current)
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append('image', file);
      let range = quill.current.getEditorSelection();
      console.log(range)
      range.index += 1

      const res = await blogService.uploadImage(formData);
      console.log(res)
      var reader = new FileReader();

      reader.onload = function (e) {
        // imageRef.current.src = e.target.result
        quill.current.getEditor().insertEmbed(
          range.index,
          'image',
          window.location.origin + `/assets/blog/${res.file_name}`
        );
        quill.current.setEditorSelection(quill.current.getEditor(), range);
      }

      reader.readAsDataURL(file);

    };
  }
  if (toHome)
    return <Redirect to="/dashboard/blog" />
  return <div className="BlogForm">
    {loading && <div className="loading style-2"><div className="loading-wheel"></div></div>}
    <h3>{!props.match.params.id ? 'Nouveau' : 'Edition'} post </h3>

    <FormGroup>
      <Label htmlFor="nom">Titre</Label>
      <Input type="text" name="titre" innerRef={(n) => nameRef = n} required defaultValue={name} />
      {(errors && errors.name) && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
    </FormGroup>

    <FormGroup>
      <Label htmlFor="tags">Tags</Label>
      <CreatableSelect
        isMulti
        value={selectedTags}
        onChange={handleTagsChange}
        options={tags.map(t => toLabelAndValue(t))}
      />
      {(errors && errors.tags) && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
    </FormGroup>

    <FormGroup>
      <Label htmlFor="tags">Catégories</Label>
      <CreatableSelect
        isMulti
        value={selectedCats}
        onChange={handleCategoryChange}
        options={categories.map(c => toLabelAndValue(c))}
      />
      {(errors && errors.cats) && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
    </FormGroup>

    <FormGroup>
      <Label>Contenu</Label>
      <ReactQuill
        value={contenu}
        ref={quill}
        modules={{
          toolbar: {
            container: [
              [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
              ['code-block']
            ]
            ,
            handlers: {
              image: imageHandler
            }
          }
        }}
        theme="snow"

      />
      {(errors && errors.content) && <p style={{ color: 'red' }}>Ce champs est requis!</p>}
    </FormGroup>
    <div className="btn-group ml-auto mr-5" style={{ maxWidth: '500px' }}>
      <Link className="btn btn-default" to="/dashboard/blog">
        Annuler
        </Link>
      <button onClick={() => submit()} className="btn btn-primary" required >
        Sauvgarder
      </button>
    </div>
  </div>
}

export default BlogForm