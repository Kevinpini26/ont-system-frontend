import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

const toolbarBtn = (active) =>
  `rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
    active
      ? 'bg-ont-blue-700 text-white'
      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
  }`;

/**
 * Éditeur de texte riche pour la rédaction des courriers (projet de
 * réponse au Secrétariat 01). Le backend ne fait que stocker/retourner ce
 * contenu structuré (JSON TipTap) — aucun rendu HTML n'est effectué côté
 * serveur, et l'affichage passe toujours par ce même éditeur (schema
 * ProseMirror), jamais par une injection HTML brute : pas de vecteur XSS.
 */
export function TipTapEditor({ content, onChange, editable = true }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content ?? '',
    editable,
    onUpdate: ({ editor }) => onChange?.(editor.getJSON()),
  });

  useEffect(() => {
    if (editor && content !== undefined) {
      const current = JSON.stringify(editor.getJSON());
      const next = JSON.stringify(content);
      if (current !== next) {
        editor.commands.setContent(content ?? '', { emitUpdate: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700">
      {editable && (
        <div className="flex gap-1 border-b border-slate-200 bg-slate-50 p-1.5 dark:border-slate-800 dark:bg-slate-800/60">
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={toolbarBtn(editor.isActive('bold'))}>
            Gras
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={toolbarBtn(editor.isActive('italic'))}>
            Italique
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={toolbarBtn(editor.isActive('bulletList'))}>
            Liste
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={toolbarBtn(editor.isActive('heading', { level: 2 }))}
          >
            Titre
          </button>
        </div>
      )}
      <EditorContent
        editor={editor}
        className="min-h-32 bg-white px-4 py-3 text-sm text-slate-800 [&_.ProseMirror]:outline-none [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_p]:mb-2 [&_ul]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 dark:bg-slate-900 dark:text-slate-200"
      />
    </div>
  );
}
