# Reconstruit les commits apres 53d62aa en decoupant public/images (gros PNG) par petits lots.
# Usage: .\scripts\rebuild-history-split-images.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$base = "53d62aa1128f4979bb1973eee8cc8510bad85943"
if ((git rev-parse $base) -ne $base) {
  $base = git rev-parse $base
}

Write-Host "Reset mou vers $base (contenu du tip conserve)..."
git reset --soft $base
if ($LASTEXITCODE -ne 0) { throw "reset --soft a echoue" }

git reset
if ($LASTEXITCODE -ne 0) { throw "reset a echoue" }

git add public/favicon.png public/icons
git commit -m "assets: favicon et icons"

$images = @(Get-ChildItem "public\images\*.png" | Sort-Object Name)
$imgBatch = 3
$lot = 0
for ($i = 0; $i -lt $images.Count; $i += $imgBatch) {
  $lot++
  $end = [Math]::Min($i + $imgBatch - 1, $images.Count - 1)
  for ($j = $i; $j -le $end; $j++) {
    git add -- $images[$j].FullName
  }
  git commit -m "assets: images galerie lot $lot"
}

$frames = @(Get-ChildItem "public\frames\v1\*.jpg" | Sort-Object Name)
$frameBatch = 24
$flot = 0
for ($i = 0; $i -lt $frames.Count; $i += $frameBatch) {
  $flot++
  $end = [Math]::Min($i + $frameBatch - 1, $frames.Count - 1)
  for ($j = $i; $j -le $end; $j++) {
    git add -- $frames[$j].FullName
  }
  git commit -m "assets: frames v1 lot $flot"
}

if (Test-Path "vid1.mp4") {
  git add vid1.mp4
  git commit -m "assets: video hero"
}

git add scripts/push-each-commit.ps1 scripts/rebuild-history-split-images.ps1 2>$null
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
  git commit -m "chore: scripts utilitaires git (push incrementiel)"
}

Write-Host ""
Write-Host "Historique reconstruit:" -ForegroundColor Green
git log --oneline "${base}..HEAD"
