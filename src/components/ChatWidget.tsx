import { useEffect, useRef, useState } from 'react'
import { Send, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const LANGFLOW_ENDPOINT =
  'https://agent-builder.nhtech.link/api/v1/run/b759b072-9efc-464c-8f7c-3f5b00571731?stream=false'

const LANGFLOW_API_KEY = 'sk--iN-2r48-_jzW7_OYoSEu2qsHXetZkrKycs5m8evb3Y'
const SESSION_STORAGE_KEY = 'real-estate-agent-session-id'

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getSessionId() {
  const existingSession = localStorage.getItem(SESSION_STORAGE_KEY)

  if (existingSession) {
    return existingSession
  }

  const newSession = createId()
  localStorage.setItem(SESSION_STORAGE_KEY, newSession)
  return newSession
}

function extractAssistantMessage(data: unknown): string {
  if (typeof data === 'string') {
    return data
  }

  if (!data || typeof data !== 'object') {
    return 'I received your message, but could not read the response.'
  }

  const response = data as {
    output?: unknown
    result?: unknown
    text?: unknown
    message?: unknown
    outputs?: Array<{
      outputs?: Array<{
        results?: {
          message?: {
            text?: unknown
          }
        }
        outputs?: {
          message?: {
            message?: unknown
            text?: unknown
          }
        }
      }>
    }>
  }

  const langflowMessage =
    response.outputs?.[0]?.outputs?.[0]?.results?.message?.text ??
    response.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message ??
    response.outputs?.[0]?.outputs?.[0]?.outputs?.message?.text ??
    response.output ??
    response.result ??
    response.text ??
    response.message

  if (typeof langflowMessage === 'string' && langflowMessage.trim()) {
    return langflowMessage.trim()
  }

  return 'I received a response, but it was not in a readable chat format.'
}

function MessageContent({ message }: { message: ChatMessage }) {
  if (message.role === 'user') {
    return <span className="whitespace-pre-wrap">{message.content}</span>
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
        h1: ({ children }) => <h1 className="mb-2 text-base font-bold text-slate-950">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-2 text-sm font-bold text-slate-950">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 text-sm font-semibold text-slate-950">{children}</h3>,
        ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        a: ({ children, href }) => (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-700 underline underline-offset-2"
          >
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[0.85em] text-slate-900">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="mb-2 max-w-full overflow-x-auto rounded-md bg-slate-100 p-2 text-xs text-slate-900 last:mb-0">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="mb-2 border-l-4 border-blue-200 pl-3 text-slate-600 last:mb-0">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-3 border-slate-200" />,
      }}
    >
      {message.content}
    </ReactMarkdown>
  )
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: 'assistant',
      content: 'Hi! I can help you find homes, compare listings, or answer questions about this property demo.',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const sessionIdRef = useRef<string | null>(null)

  useEffect(() => {
    sessionIdRef.current = getSessionId()
  }, [])

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isOpen, messages, isSending])

  async function sendMessage() {
    const trimmedMessage = inputValue.trim()

    if (!trimmedMessage || isSending) {
      return
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmedMessage,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInputValue('')
    setIsSending(true)

    try {
      const response = await fetch(LANGFLOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': LANGFLOW_API_KEY,
        },
        body: JSON.stringify({
          output_type: 'chat',
          input_type: 'chat',
          input_value: trimmedMessage,
          session_id: sessionIdRef.current ?? getSessionId(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Langflow request failed with status ${response.status}`)
      }

      const data: unknown = await response.json()
      const assistantMessage: ChatMessage = {
        id: createId(),
        role: 'assistant',
        content: extractAssistantMessage(data),
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    } catch (error) {
      console.error(error)
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: createId(),
          role: 'assistant',
          content: 'Sorry, I could not reach the real estate assistant right now. Please try again.',
        },
      ])
    } finally {
      setIsSending(false)
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      void sendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex min-h-12 items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open real estate assistant chat"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            💬
          </span>
          <span>Chat with Agent</span>
        </button>
      )}

      {isOpen && (
        <section
          className="fixed inset-0 z-50 flex bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[400px] sm:max-w-[calc(100vw-3rem)] sm:rounded-lg sm:shadow-2xl"
          aria-label="Real Estate Assistant"
        >
          <div className="flex h-full w-full flex-col overflow-hidden sm:rounded-lg">
            <header className="flex min-h-16 items-center justify-between bg-blue-600 px-4 py-3 text-white">
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold">Real Estate Assistant</h2>
                <p className="text-xs text-blue-100">Ask about homes, locations, and pricing</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ml-3 rounded-md p-2 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white/80"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    <MessageContent message={message} />
                  </div>
                </div>
              ))}

              {isSending && (
                <div className="flex justify-start">
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                    typing...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-200 bg-white p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={isSending}
                  aria-label="Message"
                />
                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={!inputValue.trim() || isSending}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300"
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
