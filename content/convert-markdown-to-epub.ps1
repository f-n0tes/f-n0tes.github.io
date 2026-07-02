param(
  [Parameter(Position = 0)]
  [string]$InputPath = "Zur kritischen Theorie (Hindrichs). Kapitel 2. Die Idee einer kritischen Theorie und die Erfahrung totalitärer Gesellschaften.md",

  [Parameter(Position = 1)]
  [string]$OutputPath = "Zur kritischen Theorie (Hindrichs). Kapitel 2. Die Idee einer kritischen Theorie und die Erfahrung totalitärer Gesellschaften.epub"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Resolve-PathOrDefault {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,
    [Parameter(Mandatory = $true)]
    [string]$BaseDir
  )

  if ([System.IO.Path]::IsPathRooted($Path)) {
    return [System.IO.Path]::GetFullPath($Path)
  }

  return [System.IO.Path]::GetFullPath((Join-Path $BaseDir $Path))
}

$resolvedOutput = Resolve-PathOrDefault -Path $OutputPath -BaseDir $scriptDir

$resolvedInput = $null
if (-not [string]::IsNullOrWhiteSpace($InputPath)) {
  $resolvedInput = Resolve-PathOrDefault -Path $InputPath -BaseDir $scriptDir
  if (-not (Test-Path -LiteralPath $resolvedInput -PathType Leaf)) {
    $matchingFiles = Get-ChildItem -LiteralPath $scriptDir -File -Filter "*.md" | Where-Object {
      $_.Name -like "*$([System.IO.Path]::GetFileNameWithoutExtension($InputPath))*"
    }
    if ($matchingFiles) {
      $resolvedInput = $matchingFiles[0].FullName
    }
  }
}

if (-not $resolvedInput) {
  $matchingFiles = Get-ChildItem -LiteralPath $scriptDir -File -Filter "*.md" | Where-Object {
    $_.Name -like "*Kapitel 2*" -and $_.Name -like "*Zur kritischen Theorie*"
  }
  if ($matchingFiles) {
    $resolvedInput = $matchingFiles[0].FullName
  }
}

if (-not $resolvedInput -or -not (Test-Path -LiteralPath $resolvedInput -PathType Leaf)) {
  throw "Die Markdown-Datei wurde nicht gefunden. Bitte den Dateinamen mitgeben oder die Datei im selben Ordner ablegen."
}

$cssPath = Join-Path $scriptDir "epub.css"
$cssArgs = @()
if (Test-Path -LiteralPath $cssPath -PathType Leaf) {
  $cssArgs = @("--css", $cssPath)
}

$command = Get-Command pandoc -ErrorAction SilentlyContinue
if (-not $command) {
  throw "Pandoc wurde nicht gefunden. Bitte zuerst installieren oder zur PATH-Umgebung hinzufügen."
}

$pandocArgs = @(
  $resolvedInput,
  "-o", $resolvedOutput,
  "--from", "markdown+footnotes+yaml_metadata_block",
  "--standalone",
  "--toc",
  "--toc-depth=3",
  "--split-level=2",
  "--metadata", "lang=de"
) + $cssArgs

Write-Host "Erstelle EPUB aus $resolvedInput..."
& pandoc @pandocArgs
if ($LASTEXITCODE -ne 0) {
  throw "Pandoc beendete mit Fehlercode $LASTEXITCODE"
}

Write-Host "EPUB erfolgreich erstellt: $resolvedOutput"
