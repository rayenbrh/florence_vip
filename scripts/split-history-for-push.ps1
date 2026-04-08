# Recree l'historique en plusieurs commits pour pousser par etapes (moins de Mo par push).
# Usage: depuis la racine du depot: .\scripts\split-history-for-push.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

if (-not (Test-Path .git)) { throw "Pas un depot Git." }

# Sauvegarde de l'ancienne ref
$old = git rev-parse main 2>$null
if ($LASTEXITCODE -eq 0) {
  git branch -f backup-before-split $old
  Write-Host "Branche sauvegardee: backup-before-split"
}

git checkout --orphan newmain
if ($LASTEXITCODE -ne 0) { throw "checkout --orphan a echoue" }

# Tout desindexer, fichiers restent sur disque
git reset

# 1 — Code et config (leger)
git add .gitignore package.json package-lock.json vite.config.js netlify.toml index.html src scripts
git commit -m "chore: config et code source"

# 2 — Assets publics hors frames
git add public/favicon.png public/icons public/images
git commit -m "assets: favicon, icons et images"

# 3 — Frames par lots (192 fichiers)
$frames = Get-ChildItem "public\frames\v1\*.jpg" | Sort-Object Name
$batchSize = 24
$batch = 0
for ($i = 0; $i -lt $frames.Count; $i += $batchSize) {
  $batch++
  $slice = $frames[$i..([Math]::Min($i + $batchSize - 1, $frames.Count - 1))]
  foreach ($f in $slice) {
    git add -- "$($f.FullName)"
  }
  git commit -m "assets: frames v1 lot $batch"
}

# 4 — Video
if (Test-Path "vid1.mp4") {
  git add vid1.mp4
  git commit -m "assets: video hero"
}

# Remplacer main
git branch -D main 2>$null
git branch -m main

Write-Host "OK: $($batch + 2) commits (estimation). Branche: main. Ancienne ref: backup-before-split"
git log --oneline
